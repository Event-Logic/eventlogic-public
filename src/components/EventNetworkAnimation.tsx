'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  type: 'event' | 'supplier' | 'participant' | 'venue';
  connections: number[];
  pulsePhase: number;
}

export default function EventNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const isMobile = window.innerWidth < 768;
    camera.position.set(isMobile ? 150 : 200, 0, isMobile ? 250 : 300);
    camera.lookAt(0, 0, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light1 = new THREE.PointLight(0x9333ea, 1, 500);
    light1.position.set(100, 100, 100);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0xc084fc, 0.8, 500);
    light2.position.set(-100, -100, 100);
    scene.add(light2);

    // Node system
    const nodes: Node[] = [];
    const nodeCount = isMobile ? 40 : 60;
    const nodeTypes: Node['type'][] = ['event', 'supplier', 'participant', 'venue'];
    const nodeColors = {
      event: 0x9333ea,      // Purple - main events
      supplier: 0xc084fc,   // Light purple - suppliers
      participant: 0x7e22ce, // Dark purple - participants
      venue: 0xa855f7       // Medium purple - venues
    };

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      const node: Node = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200
        ),
        velocity: new THREE.Vector3(0, 0, 0),
        type,
        connections: [],
        pulsePhase: Math.random() * Math.PI * 2
      };
      nodes.push(node);
    }

    // Create connections
    nodes.forEach((node, i) => {
      const connectionCount = node.type === 'event' ? 3 + Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 2);
      for (let j = 0; j < connectionCount; j++) {
        const target = Math.floor(Math.random() * nodeCount);
        if (target !== i && !node.connections.includes(target)) {
          node.connections.push(target);
        }
      }
    });

    // Create visual elements
    const nodeGroup = new THREE.Group();
    const connectionGroup = new THREE.Group();
    scene.add(nodeGroup);
    scene.add(connectionGroup);

    // Node meshes
    const nodeMeshes: THREE.Mesh[] = [];
    nodes.forEach((node, i) => {
      const size = node.type === 'event' ? 4 : 2.5;
      const geometry = new THREE.SphereGeometry(size, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: nodeColors[node.type],
        emissive: nodeColors[node.type],
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.9
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(node.position);
      nodeMeshes.push(mesh);
      nodeGroup.add(mesh);
    });

    // Connection lines
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });

    const connections: THREE.Line[] = [];
    nodes.forEach((node, i) => {
      node.connections.forEach(targetIndex => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const line = new THREE.Line(geometry, connectionMaterial.clone());
        connections.push(line);
        connectionGroup.add(line);
      });
    });

    // Add floating particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 400;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
      
      const color = new THREE.Color(Object.values(nodeColors)[Math.floor(Math.random() * 4)]);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
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
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation
    const clock = new THREE.Clock();
    let connectionIndex = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();

      // Update node positions with physics
      nodes.forEach((node, i) => {
        // Apply forces
        const force = new THREE.Vector3(0, 0, 0);
        
        // Attraction to center
        const toCenter = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), node.position);
        toCenter.multiplyScalar(0.001);
        force.add(toCenter);
        
        // Repulsion from other nodes
        nodes.forEach((other, j) => {
          if (i !== j) {
            const diff = new THREE.Vector3().subVectors(node.position, other.position);
            const distance = diff.length();
            if (distance < 50) {
              diff.normalize().multiplyScalar(100 / (distance * distance));
              force.add(diff);
            }
          }
        });
        
        // Mouse influence
        const mouseForce = new THREE.Vector3(
          mouseRef.current.x * 50,
          mouseRef.current.y * 50,
          0
        );
        const toMouse = new THREE.Vector3().subVectors(mouseForce, node.position);
        toMouse.multiplyScalar(0.0005);
        force.add(toMouse);
        
        // Apply force
        node.velocity.add(force);
        node.velocity.multiplyScalar(0.95); // Damping
        node.position.add(node.velocity);
        
        // Update mesh
        nodeMeshes[i].position.copy(node.position);
        
        // Pulse effect
        const pulseFactor = 1 + Math.sin(elapsedTime * 2 + node.pulsePhase) * 0.1;
        nodeMeshes[i].scale.setScalar(pulseFactor);
        
        // Update material emissive intensity
        const material = nodeMeshes[i].material as THREE.MeshPhongMaterial;
        material.emissiveIntensity = 0.2 + Math.sin(elapsedTime * 3 + node.pulsePhase) * 0.1;
      });

      // Update connections
      connectionIndex = 0;
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          if (connections[connectionIndex]) {
            const positions = connections[connectionIndex].geometry.attributes.position.array as Float32Array;
            positions[0] = node.position.x;
            positions[1] = node.position.y;
            positions[2] = node.position.z;
            positions[3] = nodes[targetIndex].position.x;
            positions[4] = nodes[targetIndex].position.y;
            positions[5] = nodes[targetIndex].position.z;
            connections[connectionIndex].geometry.attributes.position.needsUpdate = true;
            
            // Pulse connections
            const distance = node.position.distanceTo(nodes[targetIndex].position);
            const material = connections[connectionIndex].material as THREE.LineBasicMaterial;
            material.opacity = 0.2 + Math.sin(elapsedTime * 2 + i) * 0.1;
          }
          connectionIndex++;
        });
      });

      // Rotate particle cloud
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Camera movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 50;
      camera.position.y = Math.cos(elapsedTime * 0.15) * 30;
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