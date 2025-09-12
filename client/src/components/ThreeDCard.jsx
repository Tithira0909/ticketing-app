import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { MathUtils } from 'three';

// This is the 3D mesh that will hold the HTML content
const CardMesh = ({ children }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Rotate the card based on mouse position
  useFrame(({ viewport, mouse }) => {
    if (meshRef.current) {
      const x = (mouse.x * viewport.width) / 2.5;
      const y = (mouse.y * viewport.height) / 2.5;

      // Use lerp for smooth rotation
      meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, x / 25, 0.1);
      meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, -y / 25, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={1} // Adjust scale if needed
    >
      {/* Plane for the card face */}
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color="white" transparent opacity={0} />

      {/* Embed HTML content onto the mesh */}
      <Html
        transform
        occlude
        position={[0, 0, 0.01]} // Slightly in front of the mesh
        style={{
          width: '768px', // Corresponds to max-width of cinematic-card
          pointerEvents: 'none', // Allow mouse events to pass through to the canvas
        }}
      >
        {/* The children prop will be the content of the card */}
        <div style={{ pointerEvents: 'auto' }}>{children}</div>
      </Html>
    </mesh>
  );
};

// The main component that sets up the 3D scene
const ThreeDCard = ({ children }) => {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1, // Place it behind the main content initially
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <CardMesh>{children}</CardMesh>
    </Canvas>
  );
};

// Wrapper component to be used in App.jsx
export const ThreeDScene = ({ children }) => {
  return (
    <div
      style={{
        perspective: '1000px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '48rem', // max-width of cinematic-card
        }}
      >
        {/* The 3D effect canvas */}
        <ThreeDCard>{children}</ThreeDCard>
        {/* The actual content (for interaction) */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'auto',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
