'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EventCubeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Get the parent container size instead of window size
    const container = canvas.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    const isMobile = window.innerWidth < 768;
    camera.position.set(isMobile ? 10 : 15, isMobile ? 10 : 15, isMobile ? 20 : 30);
    camera.lookAt(0, 0, 0);

    // Lighting - increase brightness
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Add rim light for better definition
    const rimLight = new THREE.DirectionalLight(0x9333ea, 1.0);
    rimLight.position.set(-10, 10, -10);
    scene.add(rimLight);
    
    // Add another light for better visibility
    const fillLight = new THREE.PointLight(0xffffff, 0.8, 100);
    fillLight.position.set(0, 0, 20);
    scene.add(fillLight);

    // Create cube grid
    const cubeGroup = new THREE.Group();
    const cubes: THREE.Mesh[] = [];
    const gridSize = isMobile ? 3 : 4;
    const spacing = 3;
    const cubeSize = 2;

    // Define cube types and colors - brighter colors for better visibility
    const cubeTypes = [
      { color: 0x9333ea, emissive: 0x9333ea, name: 'event' },      // Purple - Events
      { color: 0xa855f7, emissive: 0xa855f7, name: 'venue' },      // Medium purple - Venues
      { color: 0xc084fc, emissive: 0xc084fc, name: 'supplier' },   // Light purple - Suppliers
      { color: 0x4a4a4a, emissive: 0x9333ea, name: 'empty' },      // Gray - Empty slots
    ];

    // Create rounded box geometry
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 2, 2, 2);
    
    // Apply slight bevel by modifying vertices
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      vertex.normalize().multiplyScalar(cubeSize * 0.5 * 1.05);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();

    // Create cubes in a grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const typeIndex = Math.floor(Math.random() * cubeTypes.length);
          const type = cubeTypes[typeIndex];
          
          const material = new THREE.MeshPhysicalMaterial({
            color: type.color,
            emissive: type.emissive,
            emissiveIntensity: type.name === 'empty' ? 0.05 : 0.1,
            metalness: 0.2,
            roughness: 0.3,
            clearcoat: type.name !== 'empty' ? 0.3 : 0,
            clearcoatRoughness: 0.5,
          });

          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(
            (x - (gridSize - 1) / 2) * spacing,
            (y - (gridSize - 1) / 2) * spacing,
            (z - (gridSize - 1) / 2) * spacing
          );
          
          cube.castShadow = true;
          cube.receiveShadow = true;
          cube.userData = { 
            type: type.name, 
            originalY: cube.position.y,
            floatOffset: Math.random() * Math.PI * 2,
            rotationSpeed: 0.002 + Math.random() * 0.003
          };
          
          cubes.push(cube);
          cubeGroup.add(cube);
        }
      }
    }

    scene.add(cubeGroup);

    // Add subtle particle effects
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x9333ea,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
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

    // Raycaster for hover effects
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Animation
    const clock = new THREE.Clock();
    let currentIntersected: THREE.Mesh | null = null;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update raycaster
      mouse.x = mouseRef.current.x;
      mouse.y = mouseRef.current.y;
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(cubes);
      
      if (intersects.length > 0) {
        const newIntersected = intersects[0].object as THREE.Mesh;
        if (currentIntersected !== newIntersected) {
          // Reset previous
          if (currentIntersected) {
            const material = currentIntersected.material as THREE.MeshPhysicalMaterial;
            material.emissiveIntensity = currentIntersected.userData.type === 'empty' ? 0.05 : 0.1;
          }
          // Highlight new
          currentIntersected = newIntersected;
          const material = currentIntersected.material as THREE.MeshPhysicalMaterial;
          material.emissiveIntensity = 0.3;
        }
      } else if (currentIntersected) {
        // Reset when not hovering
        const material = currentIntersected.material as THREE.MeshPhysicalMaterial;
        material.emissiveIntensity = currentIntersected.userData.type === 'empty' ? 0.05 : 0.1;
        currentIntersected = null;
      }

      // Animate cubes
      cubes.forEach((cube, index) => {
        // Gentle floating
        const floatY = Math.sin(elapsedTime + cube.userData.floatOffset) * 0.1;
        cube.position.y = cube.userData.originalY + floatY;
        
        // Subtle rotation
        if (cube.userData.type !== 'empty') {
          cube.rotation.x += cube.userData.rotationSpeed;
          cube.rotation.y += cube.userData.rotationSpeed * 0.7;
        }
      });

      // Rotate the entire group slowly
      cubeGroup.rotation.y = elapsedTime * 0.05;
      
      // Camera movement based on mouse
      camera.position.x = 20 + mouseRef.current.x * 5;
      camera.position.y = 20 + mouseRef.current.y * 5;
      camera.lookAt(0, 0, 0);

      // Animate particles
      particles.rotation.y = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of geometries and materials
      cubes.forEach(cube => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        filter: 'contrast(1.1) brightness(1.1)',
      }}
      aria-hidden="true"
    />
  );
}