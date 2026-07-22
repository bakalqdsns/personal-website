'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const COUNT = 200;
const MOBILE_COUNT = 60;

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;
}

function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const { viewport, size } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      positions.set([x, y, z], i * 3);
      seeds[i] = Math.random() * 100;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixel: { value: new THREE.Vector2(size.width, size.height) },
        uColorA: { value: new THREE.Color('#00F0FF') },
        uColorB: { value: new THREE.Color('#A855F7') },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float aSeed;
        varying float vDist;
        varying float vMix;

        void main() {
          vec3 pos = position;
          float t = uTime * 0.4 + aSeed;
          pos.x += sin(t) * 0.18;
          pos.y += cos(t * 0.7) * 0.18;
          pos.z += sin(t * 0.5) * 0.12;

          // mouse parallax
          pos.xy += uMouse * (0.6 + 0.6 * sin(aSeed));

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (3.0 + 2.0 * sin(aSeed)) * (320.0 / -mv.z);
          gl_Position = projectionMatrix * mv;

          vDist = length(uMouse - pos.xy * 0.08);
          vMix = 0.5 + 0.5 * sin(aSeed + uTime * 0.6);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vDist;
        varying float vMix;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d) * 0.85;
          vec3 col = mix(uColorA, uColorB, vMix);
          col += uColorA * 0.4 * exp(-vDist * 1.2);
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    return { geometry: geo, material: mat };
  }, [count, size.width, size.height]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;
    // smooth mouse to target
    const target = state.pointer;
    mouse.current.x += (target.x * 2 - mouse.current.x) * 0.05;
    mouse.current.y += (target.y * 2 - mouse.current.y) * 0.05;
    material.uniforms.uMouse.value.copy(mouse.current);
    // gentle rotation
    points.current.rotation.z = Math.sin(t * 0.1) * 0.04;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}

export default function ParticleField() {
  const count = typeof window === 'undefined' ? COUNT : isMobile() ? MOBILE_COUNT : COUNT;
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-0"
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Particles count={count} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,10,0.65)_70%)]" />
    </div>
  );
}