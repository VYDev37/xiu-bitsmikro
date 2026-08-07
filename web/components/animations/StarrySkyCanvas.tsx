'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StarrySkyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Three.js High-Definition Starry Night Sky Canvas
    const scene = new THREE.Scene();
    // Clear, crisp deep mountain night sky fog (matching #020617 layout bg)
    scene.fog = new THREE.FogExp2(0x020617, 0.0008);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2500);
    camera.position.z = 450;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 1. Crisp Starfield (Increased Count & Twinkle Phase)
    const starsCount = 7500;
    const starsGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(starsCount * 3);
    const colorArray = new Float32Array(starsCount * 3);
    const scaleArray = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      // Distribute in a large sphere
      const r = 300 + Math.random() * 1100;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i3 + 2] = r * Math.cos(phi);

      // Color palette: Crystal White, Sapphire Blue, Violet, Cyan
      const mix = Math.random();
      if (mix > 0.8) {
        colorArray[i3] = 0.6; colorArray[i3 + 1] = 0.8; colorArray[i3 + 2] = 1.0; // Cyan/Blue star
      } else if (mix > 0.6) {
        colorArray[i3] = 0.9; colorArray[i3 + 1] = 0.7; colorArray[i3 + 2] = 1.0; // Soft Violet star
      } else {
        colorArray[i3] = 0.95; colorArray[i3 + 1] = 0.98; colorArray[i3 + 2] = 1.0; // Crystal White
      }

      scaleArray[i] = Math.random() * 1.8 + 0.5;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true
    });

    const starMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starMesh);

    // 2. Zodiac & Xiu Constellation Lines & Nodes
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: 0x38bdf8, // sky-400
      transparent: true, 
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const nodesGeometry = new THREE.BufferGeometry();
    const nodesCount = 220;
    const nodesPos = new Float32Array(nodesCount * 3);
    
    for (let i = 0; i < nodesCount * 3; i++) {
      nodesPos[i] = (Math.random() - 0.5) * 900;
    }
    nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodesPos, 3));
    
    // Connect close nodes to form abstract constellation meshes
    const points = [];
    for (let i = 0; i < nodesCount; i++) {
      const v1 = new THREE.Vector3(nodesPos[i * 3], nodesPos[i * 3 + 1], nodesPos[i * 3 + 2]);
      for (let j = i + 1; j < nodesCount; j++) {
        const v2 = new THREE.Vector3(nodesPos[j * 3], nodesPos[j * 3 + 1], nodesPos[j * 3 + 2]);
        if (v1.distanceTo(v2) < 95) {
          points.push(v1);
          points.push(v2);
        }
      }
    }
    
    const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
    const lineMesh = new THREE.LineSegments(lineGeom, linesMaterial);
    scene.add(lineMesh);

    // Glowing Constellation Nodes
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x7dd3fc, // sky-300
      size: 3.0,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const nodesMesh = new THREE.Points(nodesGeometry, nodeMaterial);
    scene.add(nodesMesh);

    // 3. Meteor Shower with Streaks
    const meteors: THREE.Mesh[] = [];
    const meteorGeometry = new THREE.CylinderGeometry(0, 0.5, 75, 3);
    meteorGeometry.rotateX(Math.PI / 2);
    
    const meteorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xe0e7ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    function createMeteor() {
      if (prefersReduced) return;
      if (meteors.length > 4) return;
      
      const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
      meteor.position.set(
        Math.random() * 1200 - 300, 
        700 + Math.random() * 300, 
        Math.random() * 700 - 350
      );
      
      meteor.userData.velocity = new THREE.Vector3(-28, -22, 0);
      meteor.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), 
        meteor.userData.velocity.clone().normalize()
      );

      scene.add(meteor);
      meteors.push(meteor);
    }

    // Smooth Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReduced) {
        targetX = mouseX * 0.6;
        targetY = mouseY * 0.6;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Subtle rotation of starry sky & constellations
        starMesh.rotation.y = elapsedTime * 0.012;
        starMesh.rotation.x = elapsedTime * 0.004;
        
        lineMesh.rotation.y = elapsedTime * 0.018;
        nodesMesh.rotation.y = elapsedTime * 0.018;

        // Trigger meteors
        if (Math.random() > 0.98) createMeteor();

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.position.add(m.userData.velocity);
          
          if (m.position.y < -500) {
            scene.remove(m);
            meteors.splice(i, 1);
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // GSAP ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!prefersReduced) {
          gsap.to(camera.position, {
            z: 450 - (self.progress * 300),
            duration: 0.5,
            overwrite: "auto"
          });
        }
      }
    });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      scrollTrigger.kill();
      
      // Dispose Three.js resources
      starsGeometry.dispose();
      starsMaterial.dispose();
      nodesGeometry.dispose();
      nodeMaterial.dispose();
      lineGeom.dispose();
      linesMaterial.dispose();
      meteorGeometry.dispose();
      meteorMaterial.dispose();
      renderer.dispose();
      
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
}
