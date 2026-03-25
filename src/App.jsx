// src/App.jsx
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Loader } from '@react-three/drei';
import Home from './pages/Home';

function App() {
  // We move the cart state here so it lives outside the 3D context
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505', position: 'relative' }}>
      
      {/* 1. HTML OVERLAY (SAFE ZONE) */}
      <div id="global-cart" style={{
        position: 'fixed',
        top: '40px',
        right: '40px',
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999, // Stays above the canvas
        color: 'white',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'transform 0.3s ease'
      }}>
        🛒
      </div>

      {/* 2. 3D CANVAS (3D ZONE) */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} intensity={2} castShadow />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Home />
        </Suspense>
      </Canvas>

      <Loader />
    </div>
  );
}

export default App;