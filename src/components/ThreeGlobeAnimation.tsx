'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// We'll need to install three-globe: npm install three-globe
// For now, I'll create a version that mimics the key features

export default function ThreeGlobeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(
      40, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 300);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.minDistance = 150;
    controls.maxDistance = 500;

    // Lighting
    scene.add(new THREE.AmbientLight(0x404040));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    // Create globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Earth sphere with texture-like appearance
    const globeRadius = 100;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 32);
    
    // Create a shader material for Earth-like appearance
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(0x001122) },
        color2: { value: new THREE.Color(0x003366) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          vec3 atmosphere = mix(color1, color2, intensity);
          gl_FragColor = vec4(atmosphere, 1.0);
        }
      `,
      side: THREE.DoubleSide,
      transparent: false
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius * 1.1, 64, 32);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x3cf) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(color, intensity * 0.4);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    // Event points (orange dots)
    const events = [
      { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
      { name: "New York", lat: 40.7128, lng: -74.0060 },
      { name: "Tokyo", lat: 35.6764, lng: 139.6500 },
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Paris", lat: 48.8566, lng: 2.3522 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "Singapore", lat: 1.3521, lng: 103.8198 },
      { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
      { name: "São Paulo", lat: -23.5505, lng: -46.6333 }
    ];

    const eventMeshes: THREE.Mesh[] = [];
    const eventPositions: THREE.Vector3[] = [];

    events.forEach((event) => {
      const phi = (90 - event.lat) * (Math.PI / 180);
      const theta = (event.lng + 180) * (Math.PI / 180);
      
      const x = -(globeRadius * 1.02) * Math.sin(phi) * Math.cos(theta);
      const y = (globeRadius * 1.02) * Math.cos(phi);
      const z = (globeRadius * 1.02) * Math.sin(phi) * Math.sin(theta);
      
      const position = new THREE.Vector3(x, y, z);
      eventPositions.push(position);
      
      // Orange glowing dot
      const dotGeometry = new THREE.SphereGeometry(2, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        emissive: 0xff6600
      });
      
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.copy(position);
      eventMeshes.push(dot);
      globeGroup.add(dot);
      
      // Add glow
      const glowGeometry = new THREE.SphereGeometry(3, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff8800,
        transparent: true,
        opacity: 0.4
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(position);
      globeGroup.add(glow);
    });

    // Animated light-beam arcs
    const routes = [
      { start: 0, end: 1 },  // Stockholm -> New York
      { start: 0, end: 2 },  // Stockholm -> Tokyo
      { start: 1, end: 3 },  // New York -> Sydney
      { start: 2, end: 3 },  // Tokyo -> Sydney
      { start: 0, end: 4 },  // Stockholm -> London
      { start: 4, end: 5 },  // London -> Paris
      { start: 1, end: 8 },  // New York -> San Francisco
      { start: 6, end: 7 },  // Dubai -> Singapore
      { start: 8, end: 9 },  // San Francisco -> São Paulo
    ];

    interface AnimatedArc {
      mesh: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      progress: number;
    }

    const animatedArcs: AnimatedArc[] = [];

    routes.forEach((route) => {
      const start = eventPositions[route.start];
      const end = eventPositions[route.end];
      
      // Create arc path
      const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      midpoint.normalize().multiplyScalar(globeRadius * 1.2 + distance * 0.1);
      
      const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
      
      // Create static arc line
      const arcPoints = curve.getPoints(64);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMaterial = new THREE.LineBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.2
      });
      const arcLine = new THREE.Line(arcGeometry, arcMaterial);
      globeGroup.add(arcLine);
      
      // Create animated light beam
      const beamGeometry = new THREE.SphereGeometry(1.5, 8, 8);
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.8
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      
      // Add tail effect
      const tailGeometry = new THREE.ConeGeometry(1, 8, 8);
      const tailMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.4
      });
      const tail = new THREE.Mesh(tailGeometry, tailMaterial);
      beam.add(tail);
      tail.position.z = -4;
      tail.rotation.x = Math.PI / 2;
      
      globeGroup.add(beam);
      
      animatedArcs.push({
        mesh: beam,
        curve: curve,
        progress: Math.random()
      });
    });

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Update controls
      controls.update();
      
      // Animate event dots
      eventMeshes.forEach((mesh, i) => {
        const scale = 1 + Math.sin(elapsedTime * 2 + i * 0.5) * 0.2;
        mesh.scale.setScalar(scale);
      });
      
      // Animate light beams along arcs
      animatedArcs.forEach((arc) => {
        arc.progress += 0.004;
        if (arc.progress > 1) arc.progress = 0;
        
        const point = arc.curve.getPoint(arc.progress);
        arc.mesh.position.copy(point);
        
        // Orient the beam along the path
        if (arc.progress < 0.99) {
          const nextPoint = arc.curve.getPoint(Math.min(arc.progress + 0.01, 1));
          arc.mesh.lookAt(nextPoint);
        }
        
        // Fade in/out
        const fadeIn = Math.min(arc.progress * 5, 1);
        const fadeOut = Math.min((1 - arc.progress) * 5, 1);
        const opacity = fadeIn * fadeOut;
        (arc.mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.8;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}