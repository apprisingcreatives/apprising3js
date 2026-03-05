"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// --- Code Block ---
function CodeBlock({
  position,
  delay = 0,
}: {
  position: [number, number, number];
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + delay;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.6, 0.08, 0.35]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#0F3D3E"
        emissive="#37DBDB"
        emissiveIntensity={0.15}
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  );
}

// --- Connection Line ---
function ConnectionLine({
  start,
  end,
  progress,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
}) {
  const ref = useRef<any>(null);

  const geometry = useMemo(() => {
    const points = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      if (t <= progress) {
        points.push(
          new THREE.Vector3(
            start.x + (end.x - start.x) * t,
            start.y + (end.y - start.y) * t + Math.sin(t * Math.PI) * 0.3,
            start.z + (end.z - start.z) * t
          )
        );
      }
    }
    if (points.length < 2) {
      points.push(start.clone(), start.clone());
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [start, end, progress]);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#37DBDB", transparent: true, opacity: 0.6 }),
    []
  );

  return <primitive ref={ref} object={new THREE.Line(geometry, material)} />;
}

// --- AI Core (nested icosahedron) ---
function AICore({ visible, scale }: { visible: boolean; scale: number }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      outerRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.elapsedTime * 0.3;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  if (!visible) return null;

  return (
    <group scale={scale}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#0F3D3E"
          emissive="#37DBDB"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#37DBDB"
          emissive="#37DBDB"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Pulsing glow sphere */}
      <PulsingGlow />
    </group>
  );
}

function PulsingGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.0, 16, 16]} />
      <meshStandardMaterial
        color="#37DBDB"
        emissive="#37DBDB"
        emissiveIntensity={0.2}
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

// --- Architecture Nodes ---
function ArchitectureNode({
  position,
  type = "box",
  visible,
  scale,
}: {
  position: [number, number, number];
  type?: "box" | "sphere" | "cylinder";
  visible: boolean;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
    }
  });

  if (!visible) return null;

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {type === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {type === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
      {type === "cylinder" && <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />}
      <meshStandardMaterial
        color="#0F3D3E"
        emissive="#37DBDB"
        emissiveIntensity={0.2}
        roughness={0.6}
        metalness={0.4}
      />
    </mesh>
  );
}

// --- Grid Floor ---
function GridFloor() {
  return (
    <gridHelper
      args={[20, 40, "#1a4a4b", "#0d2a2b"]}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// --- Floating Particles ---
function Particles({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 12,
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed + particle.offset;
      dummy.position.set(
        particle.x + Math.sin(t * 0.3) * 0.5,
        particle.y + Math.sin(t * 0.5) * 0.3,
        particle.z + Math.cos(t * 0.4) * 0.5
      );
      dummy.scale.setScalar(0.02 + Math.sin(t) * 0.01);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#37DBDB"
        emissive="#37DBDB"
        emissiveIntensity={1}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

// --- Camera Controller ---
function CameraController({
  stage,
  elapsed,
}: {
  stage: number;
  elapsed: number;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Define camera positions for each stage
    switch (stage) {
      case 0: // Stage 1: Close to code blocks
        targetPos.current.set(0, 0.5, 3);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 1: // Stage 2: Pull back, show connections
        targetPos.current.set(2, 1.5, 5);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 2: // Stage 3: Zoom to AI core
        targetPos.current.set(0, 0.5, 2.5);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 3: // Stage 4: Zoom out, complete system
        targetPos.current.set(3, 2, 6);
        targetLookAt.current.set(0, 0, 0);
        break;
      default: // Idle loop
        const idleAngle = elapsed * 0.05;
        targetPos.current.set(
          Math.sin(idleAngle) * 5,
          1.5 + Math.sin(elapsed * 0.1) * 0.3,
          Math.cos(idleAngle) * 5
        );
        targetLookAt.current.set(0, 0, 0);
        break;
    }

    currentPos.current.lerp(targetPos.current, 0.02);
    currentLookAt.current.lerp(targetLookAt.current, 0.02);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// --- Main Scene ---
function Scene({ onStageChange }: { onStageChange: (stage: number) => void }) {
  const [stage, setStage] = useState(0);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [aiCoreVisible, setAiCoreVisible] = useState(false);
  const [aiCoreScale, setAiCoreScale] = useState(0);
  const [archVisible, setArchVisible] = useState(false);
  const [archScale, setArchScale] = useState(0);
  const startTime = useRef(Date.now());
  const stageRef = useRef(0);

  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000;

    let newStage = 0;
    if (elapsed < 5) {
      newStage = 0; // Code blocks
    } else if (elapsed < 11) {
      newStage = 1; // Connections
      const stageProgress = (elapsed - 5) / 5;
      setConnectionProgress(easeInOutCubic(Math.min(stageProgress, 1)));
      setArchVisible(true);
      setArchScale(easeInOutCubic(Math.min(stageProgress, 1)));
    } else if (elapsed < 17) {
      newStage = 2; // AI Core
      setAiCoreVisible(true);
      const stageProgress = (elapsed - 11) / 2;
      setAiCoreScale(easeInOutCubic(Math.min(stageProgress, 1)));
    } else if (elapsed < 23) {
      newStage = 3; // Complete system
    } else {
      newStage = 4; // Idle
    }

    if (newStage !== stageRef.current) {
      stageRef.current = newStage;
      setStage(newStage);
      onStageChange(newStage);
    }
  });

  const codeBlockPositions: [number, number, number][] = [
    [-1.2, 0.3, -0.5],
    [-0.4, -0.2, 0.3],
    [0.5, 0.5, -0.2],
    [1.3, 0, 0.5],
    [-0.8, 0.7, 0.6],
    [0.2, -0.4, -0.6],
    [1.0, 0.3, -0.8],
    [-0.2, 0.1, 0.9],
  ];

  const archNodes: { pos: [number, number, number]; type: "box" | "sphere" | "cylinder" }[] = [
    { pos: [-2, 0, -1.5], type: "box" },
    { pos: [2, 0.5, -1], type: "sphere" },
    { pos: [-1.5, 1, 1.5], type: "cylinder" },
    { pos: [1.5, -0.5, 1.5], type: "box" },
    { pos: [0, 1.5, -2], type: "sphere" },
    { pos: [-2.5, -0.3, 0], type: "cylinder" },
    { pos: [2.5, 0.8, 0], type: "box" },
  ];

  const connectionPairs = useMemo(
    () => [
      [new THREE.Vector3(-1.2, 0.3, -0.5), new THREE.Vector3(-2, 0, -1.5)],
      [new THREE.Vector3(0.5, 0.5, -0.2), new THREE.Vector3(2, 0.5, -1)],
      [new THREE.Vector3(-0.4, -0.2, 0.3), new THREE.Vector3(-1.5, 1, 1.5)],
      [new THREE.Vector3(1.3, 0, 0.5), new THREE.Vector3(1.5, -0.5, 1.5)],
      [new THREE.Vector3(-0.8, 0.7, 0.6), new THREE.Vector3(0, 1.5, -2)],
      [new THREE.Vector3(0.2, -0.4, -0.6), new THREE.Vector3(-2.5, -0.3, 0)],
      [new THREE.Vector3(1.0, 0.3, -0.8), new THREE.Vector3(2.5, 0.8, 0)],
      // Lines to AI core center
      [new THREE.Vector3(-2, 0, -1.5), new THREE.Vector3(0, 0, 0)],
      [new THREE.Vector3(2, 0.5, -1), new THREE.Vector3(0, 0, 0)],
      [new THREE.Vector3(-1.5, 1, 1.5), new THREE.Vector3(0, 0, 0)],
      [new THREE.Vector3(1.5, -0.5, 1.5), new THREE.Vector3(0, 0, 0)],
    ],
    []
  );

  const elapsed = (Date.now() - startTime.current) / 1000;

  return (
    <>
      <CameraController stage={stage} elapsed={elapsed} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={aiCoreVisible ? 2 : 0} color="#37DBDB" distance={8} />

      {/* Grid Floor */}
      <GridFloor />

      {/* Particles */}
      <Particles count={50} />

      {/* Code Blocks */}
      {codeBlockPositions.map((pos, i) => (
        <CodeBlock key={`code-${i}`} position={pos} delay={i * 0.5} />
      ))}

      {/* Architecture Nodes */}
      {archNodes.map((node, i) => (
        <ArchitectureNode
          key={`arch-${i}`}
          position={node.pos}
          type={node.type}
          visible={archVisible}
          scale={archScale}
        />
      ))}

      {/* Connection Lines */}
      {connectionPairs.map((pair, i) => (
        <ConnectionLine
          key={`conn-${i}`}
          start={pair[0]}
          end={pair[1]}
          progress={connectionProgress}
        />
      ))}

      {/* AI Core */}
      <AICore visible={aiCoreVisible} scale={aiCoreScale} />

      {/* Background fog */}
      <fog attach="fog" args={["#050d10", 5, 15]} />
    </>
  );
}

export default function HeroScene({
  onStageChange,
}: {
  onStageChange: (stage: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldRender(false);
      return;
    }

    // Check hardware capability
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      setShouldRender(false);
      return;
    }
  }, []);

  if (!mounted) return null;

  if (!shouldRender) {
    // Static fallback
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-400 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-cyan-300 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/2 w-24 h-24 rounded-full bg-teal-300 blur-3xl" />
        </div>
      </div>
    );
  }

  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ background: "#050d10" }}
    >
      <Scene onStageChange={onStageChange} />
    </Canvas>
  );
}
