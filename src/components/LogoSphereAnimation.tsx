'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

export default function LogoSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    /* -------------- Renderer & scene -------------- */
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Adjust camera position based on screen size
    const isMobile = window.innerWidth < 768;
    camera.position.set(0, 0, isMobile ? 300 : 260);

    /* -------------- Lighting -------------- */
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2, 2, 2);
    scene.add(dir);

    /* -------------- Geometry buffers -------------- */
    const TOTAL_POINTS = 1800;
    const RADIUS = 110;
    const positions = new Float32Array(TOTAL_POINTS * 3);
    const colors = new Float32Array(TOTAL_POINTS * 3);

    // Event Logic logo colors
    const logoColors = [
      new THREE.Color(0x9333ea), // Purple
      new THREE.Color(0x7e22ce), // Darker purple
      new THREE.Color(0xc084fc), // Lighter purple
      new THREE.Color(0xa855f7), // Medium purple
      new THREE.Color(0xd946ef)  // Pink-purple
    ];

    // Assign random colors from our palette to each point
    for (let i = 0; i < TOTAL_POINTS; i++) {
      const color = logoColors[Math.floor(Math.random() * logoColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Adjust particle size based on screen size
    const particleSize = window.innerWidth < 768 ? 4 : 6;

    const mat = new THREE.PointsMaterial({
      vertexColors: true,
      size: particleSize,
      sizeAttenuation: true,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const pointCloud = new THREE.Points(geom, mat);
    pointCloud.rotation.order = 'YXZ';
    scene.add(pointCloud);

    /* -------------- Pre‑compute sphere positions -------------- */
    const sphereTargets = new Array(TOTAL_POINTS).fill(0).map(() => {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return new THREE.Vector3(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.sin(phi) * Math.sin(theta),
        RADIUS * Math.cos(phi)
      );
    });

    /* -------------- Load SVG → sample points -------------- */
    const logoTargets: THREE.Vector3[] = [];
    const svgPath = '/images/el/app-logo.svg';
    const loader = new SVGLoader();

    loader.load(
      svgPath,
      (data) => {
        const pts: THREE.Vector2[] = [];
        data.paths.forEach((p) => {
          const shapes = p.toShapes(true);
          shapes.forEach((s) => {
            pts.push(...s.getSpacedPoints(100));
          });
        });

        // resample to TOTAL_POINTS
        const sampled = new Array(TOTAL_POINTS).fill(0).map((_, i) =>
          pts[Math.floor((i / TOTAL_POINTS) * pts.length)] || pts[0]
        );

        // center + scale
        const box = new THREE.Box2();
        sampled.forEach((v) => box.expandByPoint(v));
        const size = new THREE.Vector2();
        box.getSize(size);
        const scale = (RADIUS * 1.8) / Math.max(size.x, size.y);
        const center = new THREE.Vector2();
        box.getCenter(center);

        sampled.forEach((pt, i) => {
          logoTargets[i] = new THREE.Vector3(
            (pt.x - center.x) * scale,
            -(pt.y - center.y) * scale,
            0
          );
        });

        init();
      },
      undefined,
      () => {
        // fallback: explode from centre
        for (let i = 0; i < TOTAL_POINTS; i++) {
          logoTargets[i] = new THREE.Vector3(0, 0, 0);
        }
        init();
      }
    );

    /* -------------- Morph & interaction -------------- */
    let morphProgress = 0; // 0 → logo, 1 → sphere
    const MORPH_TIME = 2.8; // seconds
    let rotXTarget = 0, rotYTarget = 0;

    function init() {
      // seed positions with logo points
      for (let i = 0; i < TOTAL_POINTS; i++) {
        positions[i * 3] = logoTargets[i].x;
        positions[i * 3 + 1] = logoTargets[i].y;
        positions[i * 3 + 2] = logoTargets[i].z;
      }
      geom.attributes.position.needsUpdate = true;
      animate();
    }

    const handlePointerMove = (e: PointerEvent) => {
      rotXTarget = ((e.clientY / window.innerHeight) - 0.5) * Math.PI;
      rotYTarget = ((e.clientX / window.innerWidth) - 0.5) * Math.PI;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      // Adjust camera position based on screen size
      const isMobile = window.innerWidth < 768;
      camera.position.z = isMobile ? 300 : 260;

      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const dt = clock.getDelta();

      if (morphProgress < 1) {
        morphProgress = Math.min(1, morphProgress + dt / MORPH_TIME);
      }

      for (let i = 0; i < TOTAL_POINTS; i++) {
        const lp = logoTargets[i];
        const sp = sphereTargets[i];
        const p = i * 3;
        positions[p] = THREE.MathUtils.lerp(lp.x, sp.x, morphProgress);
        positions[p + 1] = THREE.MathUtils.lerp(lp.y, sp.y, morphProgress);
        positions[p + 2] = THREE.MathUtils.lerp(lp.z, sp.z, morphProgress);
      }
      geom.attributes.position.needsUpdate = true;

      // smooth rotation towards mouse
      pointCloud.rotation.x += (rotXTarget - pointCloud.rotation.x) * 0.06;
      pointCloud.rotation.y += (rotYTarget - pointCloud.rotation.y) * 0.06;
      pointCloud.rotation.z += 0.002; // subtle perpetual spin

      renderer.render(scene, camera);
    }

    // Clean up
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
}
