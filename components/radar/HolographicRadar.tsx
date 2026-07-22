'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { skills } from '@/lib/skills';

interface RadarProps {
  active: number | null;
  onPick: (i: number | null) => void;
}

const RADIUS_SCALE = 2;
const RADAR_TILT_X = -0.55;

function RadarMesh({ active, onPick }: RadarProps) {
  const group = useRef<THREE.Group>(null);
  const [hover, setHover] = useState<number | null>(null);

  // 5 vertices around origin, angle from -90deg (top), radius = level * scale
  const points = useMemo(() => {
    return skills.map((s, i) => {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / skills.length;
      const r = s.level * RADIUS_SCALE;
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        label: s.label,
        key: s.key,
        i,
      };
    });
  }, []);

  // Triangle fan from origin -> guaranteed correct winding
  const fanGeometry = useMemo(() => {
    const positions: number[] = [];
    const n = points.length;
    for (let i = 0; i < n; i++) {
      const a = points[i];
      const b = points[(i + 1) % n];
      // CCW winding when viewed from +Z (camera side)
      positions.push(0, 0, 0);
      positions.push(a.x, a.y, 0);
      positions.push(b.x, b.y, 0);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geom.computeVertexNormals();
    return geom;
  }, [points]);

  // Outline: closed polyline through vertices
  const outlineGeometry = useMemo(() => {
    const arr = new Float32Array((points.length + 1) * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = 0;
    });
    arr[points.length * 3] = points[0].x;
    arr[points.length * 3 + 1] = points[0].y;
    arr[points.length * 3 + 2] = 0;
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    return geom;
  }, [points]);

  // Concentric pentagons as guides
  const ringsGeometry = useMemo(() => {
    const lines: number[] = [];
    [0.4, 0.8, 1.2, 1.6, 2].forEach((r) => {
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const b = points[(i + 1) % points.length];
        const ra = r * (a.x === 0 && a.y === 0 ? 0 : Math.hypot(a.x, a.y) / (skills[i].level * RADIUS_SCALE));
        const rb = r * (b.x === 0 && b.y === 0 ? 0 : Math.hypot(b.x, b.y) / (skills[(i + 1) % points.length].level * RADIUS_SCALE));
        const ca = Math.atan2(a.y, a.x);
        const cb = Math.atan2(b.y, b.x);
        lines.push(Math.cos(ca) * ra, Math.sin(ca) * ra, 0);
        lines.push(Math.cos(cb) * rb, Math.sin(cb) * rb, 0);
      }
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(new Float32Array(lines), 3)
    );
    return geom;
  }, [points]);

  // Axis spokes from center to each vertex
  const spokesGeometry = useMemo(() => {
    const arr = new Float32Array(points.length * 2 * 3);
    points.forEach((p, i) => {
      arr[i * 6] = 0;
      arr[i * 6 + 1] = 0;
      arr[i * 6 + 2] = 0;
      arr[i * 6 + 3] = p.x;
      arr[i * 6 + 4] = p.y;
      arr[i * 6 + 5] = 0;
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
    return geom;
  }, [points]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={group} rotation={[RADAR_TILT_X, 0, 0]}>
      {/* concentric guide rings */}
      <primitive object={new THREE.LineSegments(ringsGeometry, new THREE.LineBasicMaterial({ color: '#1A1A1F', transparent: true, opacity: 0.55 }))} />

      {/* axis spokes */}
      <primitive object={new THREE.LineSegments(spokesGeometry, new THREE.LineBasicMaterial({ color: '#1A1A1F', transparent: true, opacity: 0.55 }))} />

      {/* filled radar polygon (fan triangulation) */}
      <mesh geometry={fanGeometry}>
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* outline */}
      <primitive object={new THREE.LineLoop(outlineGeometry, new THREE.LineBasicMaterial({ color: '#00F0FF', transparent: true, opacity: 0.95 }))} />

      {/* vertex nodes */}
      {points.map((p, i) => {
        const isActive = active === i;
        const isHover = hover === i;
        return (
          <group key={p.key} position={[p.x, p.y, 0.02]}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHover(i);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHover(null);
                document.body.style.cursor = '';
              }}
              onClick={(e) => {
                e.stopPropagation();
                onPick(isActive ? null : i);
              }}
            >
              <sphereGeometry
                args={[isActive ? 0.16 : isHover ? 0.13 : 0.1, 24, 24]}
              />
              <meshStandardMaterial
                color={isActive ? '#FBBF24' : '#00F0FF'}
                emissive={isActive ? '#FBBF24' : '#00F0FF'}
                emissiveIntensity={isActive ? 1.5 : 0.6}
                roughness={0.4}
              />
            </mesh>
            <mesh>
              <sphereGeometry
                args={[isActive ? 0.28 : 0.2, 24, 24]}
              />
              <meshBasicMaterial
                color={isActive ? '#FBBF24' : '#00F0FF'}
                transparent
                opacity={isActive ? 0.18 : 0.1}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function HolographicRadar({ active, onPick }: RadarProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#00F0FF" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#A855F7" />
      <RadarMesh active={active} onPick={onPick} />
    </Canvas>
  );
}
