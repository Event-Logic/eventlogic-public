'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WorldSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Get container size
    const container = canvas.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    const isMobile = window.innerWidth < 768;
    camera.position.set(0, 0, isMobile ? 40 : 35);
    camera.lookAt(0, 0, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Create main group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Globe radius - made smaller
    const globeRadius = isMobile ? 10 : 12;

    // Create simple wireframe sphere
    const wireframeGeometry = new THREE.SphereGeometry(globeRadius, 24, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    worldGroup.add(wireframe);

    // Event destinations with real coordinates
    const destinations = [
      { lat: 40.7128, lon: -74.0060, name: "New York" },
      { lat: 51.5074, lon: -0.1278, name: "London" },
      { lat: 48.8566, lon: 2.3522, name: "Paris" },
      { lat: 35.6762, lon: 139.6503, name: "Tokyo" },
      { lat: -33.8688, lon: 151.2093, name: "Sydney" },
      { lat: 59.3293, lon: 18.0686, name: "Stockholm" },
      { lat: 37.7749, lon: -122.4194, name: "San Francisco" },
      { lat: -23.5505, lon: -46.6333, name: "São Paulo" },
      { lat: 1.3521, lon: 103.8198, name: "Singapore" },
      { lat: 25.2048, lon: 55.2708, name: "Dubai" },
      { lat: 55.7558, lon: 37.6173, name: "Moscow" },
      { lat: 41.9028, lon: 12.4964, name: "Rome" },
      { lat: 52.5200, lon: 13.4050, name: "Berlin" },
      { lat: -34.6037, lon: -58.3816, name: "Buenos Aires" },
      { lat: 19.4326, lon: -99.1332, name: "Mexico City" },
      { lat: 31.2304, lon: 121.4737, name: "Shanghai" },
      { lat: 13.7563, lon: 100.5018, name: "Bangkok" },
      { lat: -26.2041, lon: 28.0473, name: "Johannesburg" },
      { lat: 43.6532, lon: -79.3832, name: "Toronto" },
      { lat: 60.1699, lon: 24.9384, name: "Helsinki" }
    ];

    const destinationMeshes: THREE.Mesh[] = [];
    const destinationPositions: THREE.Vector3[] = [];

    // Create destination points
    destinations.forEach((dest) => {
      // Convert lat/lon to 3D position on sphere
      const phi = (90 - dest.lat) * (Math.PI / 180);
      const theta = (dest.lon + 180) * (Math.PI / 180);
      
      const x = -(globeRadius) * Math.sin(phi) * Math.cos(theta);
      const y = (globeRadius) * Math.cos(phi);
      const z = (globeRadius) * Math.sin(phi) * Math.sin(theta);
      
      const position = new THREE.Vector3(x, y, z);
      destinationPositions.push(position);
      
      // Create glowing point
      const dotGeometry = new THREE.SphereGeometry(0.3, 12, 12);
      const dotMaterial = new THREE.MeshPhongMaterial({
        color: 0xc084fc,
        emissive: 0xc084fc,
        emissiveIntensity: 0.5
      });
      
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.copy(position);
      destinationMeshes.push(dot);
      worldGroup.add(dot);
    });

    // Create travel arcs between select destinations
    const connections = [
      [0, 1], [0, 6], [0, 18], [1, 2], [1, 5], [1, 12], 
      [2, 11], [2, 12], [3, 8], [3, 15], [3, 4], 
      [4, 17], [5, 19], [5, 10], [6, 7], [6, 14], 
      [7, 13], [8, 9], [8, 16], [9, 10], [11, 12],
      [14, 18], [15, 16], [17, 18]
    ];

    const arcData: { curve: THREE.QuadraticBezierCurve3; line: THREE.Line }[] = [];

    connections.forEach(([startIdx, endIdx]) => {
      const start = destinationPositions[startIdx];
      const end = destinationPositions[endIdx];
      
      // Create arc between points
      const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
      const distance = start.distanceTo(end);
      midpoint.normalize();
      midpoint.multiplyScalar(globeRadius + distance * 0.15);
      
      const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      const material = new THREE.LineBasicMaterial({
        color: 0x9333ea,
        transparent: true,
        opacity: 0.2
      });
      
      const arc = new THREE.Line(geometry, material);
      worldGroup.add(arc);
      
      arcData.push({ curve, line: arc });
    });

    // Create animated light beams
    const beams: { group: THREE.Group; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = [];
    
    // Only animate some of the arcs to avoid overwhelming the scene
    const animatedArcs = arcData.filter((_, i) => i % 2 === 0);
    
    animatedArcs.forEach((arc) => {
      const beamGroup = new THREE.Group();
      
      // Create main light sphere
      const lightGeometry = new THREE.SphereGeometry(0.2, 8, 8);
      const lightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
      beamGroup.add(lightSphere);
      
      // Create glow effect
      const glowGeometry = new THREE.SphereGeometry(0.4, 8, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.3
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      beamGroup.add(glowSphere);
      
      worldGroup.add(beamGroup);
      
      beams.push({
        group: beamGroup,
        curve: arc.curve,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.002
      });
    });

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleResize = () => {
      const container = canvas.parentElement;
      const width = container?.clientWidth || window.innerWidth;
      const height = container?.clientHeight || window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate the world slowly
      worldGroup.rotation.y = elapsedTime * 0.1;
      
      // Gentle pulse on destinations
      destinationMeshes.forEach((mesh, i) => {
        const scale = 1 + Math.sin(elapsedTime * 2 + i) * 0.2;
        mesh.scale.setScalar(scale);
      });

      // Animate light beams along arcs
      beams.forEach((beam) => {
        beam.progress += beam.speed;
        if (beam.progress > 1) beam.progress = 0;
        
        // Get position along curve
        const point = beam.curve.getPoint(beam.progress);
        beam.group.position.copy(point);
        
        // Fade in/out at ends
        const fadeDistance = 0.15;
        let opacity = 1;
        if (beam.progress < fadeDistance) {
          opacity = beam.progress / fadeDistance;
        } else if (beam.progress > 1 - fadeDistance) {
          opacity = (1 - beam.progress) / fadeDistance;
        }
        
        // Update material opacity for both spheres
        beam.group.children.forEach((child, index) => {
          const mesh = child as THREE.Mesh;
          const material = mesh.material as THREE.MeshBasicMaterial;
          material.opacity = index === 0 ? opacity * 0.9 : opacity * 0.3;
        });
      });

      // Camera follows mouse smoothly
      const cameraRadius = isMobile ? 40 : 35;
      camera.position.x = Math.sin(mouseRef.current.x * 0.5) * cameraRadius;
      camera.position.z = Math.cos(mouseRef.current.x * 0.5) * cameraRadius;
      camera.position.y = mouseRef.current.y * 10;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}