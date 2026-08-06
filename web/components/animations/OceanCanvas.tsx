'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave1 = sin(pos.x * 0.25 + uTime * 0.7) * 1.6;
    float wave2 = sin(pos.y * 0.18 + uTime * 0.5) * 1.2;
    float wave3 = sin((pos.x + pos.y) * 0.12 + uTime * 0.9) * 0.8;
    float wave4 = sin(pos.x * 0.6 + uTime * 1.4) * 0.5;
    float wave5 = cos(pos.y * 0.4 + uTime * 0.6) * 0.3;
    pos.z = wave1 + wave2 + wave3 + wave4 + wave5;
    vElevation = pos.z;
    vWorldPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPos;
  void main() {
    float mixFactor = (vElevation + 3.0) / 6.0;
    vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.4, mixFactor));
    col = mix(col, uColor3, smoothstep(0.4, 0.75, mixFactor) * 0.5);
    col = mix(col, uColor4, smoothstep(0.7, 1.0, mixFactor) * 0.2);
    // Horizon glow
    col += vec3(0.03, 0.08, 0.14) * (1.0 - vUv.y);
    // Bright foam on peaks
    float foam = smoothstep(0.65, 0.85, mixFactor) * 0.25;
    col += vec3(foam * 0.8, foam * 0.9, foam);
    // Specular sparkle
    float sparkle = pow(max(0.0, sin(vWorldPos.x * 2.0 + uTime * 3.0) * sin(vWorldPos.y * 2.5 + uTime * 2.0)), 8.0) * 0.12;
    col += vec3(sparkle * 0.6, sparkle * 0.8, sparkle);
    // Subtle caustic pattern
    float caustic = pow(abs(sin(vWorldPos.x * 0.8 + uTime) * cos(vWorldPos.y * 0.6 + uTime * 0.7)), 3.0) * 0.06;
    col += vec3(caustic * 0.5, caustic * 0.8, caustic);
    gl_FragColor = vec4(col, 0.9);
  }
`;

export default function OceanCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Style the canvas to fill the container
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 0, 0);

    // Ocean plane with shader
    const geometry = new THREE.PlaneGeometry(80, 80, 200, 200);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#030818') },
        uColor2: { value: new THREE.Color('#0a4060') },
        uColor3: { value: new THREE.Color('#0ea5e9') },
        uColor4: { value: new THREE.Color('#14b8a6') },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const ocean = new THREE.Mesh(geometry, material);
    ocean.rotation.x = -Math.PI / 2.4;
    scene.add(ocean);

    // Lighting
    const ambient = new THREE.AmbientLight(0x0a4070, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0x66aadd, 1.0);
    dirLight.position.set(5, 12, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x14b8a6, 0.3);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Animation loop
    let time = 0;
    function animate() {
      if (prefersReduced) {
        // Render a single static frame
        material.uniforms.uTime.value = 2.0; // Nice static position
        renderer.render(scene, camera);
        return;
      }

      frameRef.current = requestAnimationFrame(animate);
      time += 0.012;
      material.uniforms.uTime.value = time;
      renderer.render(scene, camera);
    }
    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
