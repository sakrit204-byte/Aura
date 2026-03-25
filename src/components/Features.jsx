// src/components/Features.jsx
import React from 'react';

export default function Features() {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end', // Aligns text to the right
      alignItems: 'center',
      padding: '0 10%',
      boxSizing: 'border-box',
      pointerEvents: 'none'
    }}>
      <div style={{ 
        maxWidth: '500px', 
        textAlign: 'right', 
        color: 'white',
        pointerEvents: 'all' // Re-enable clicks for this specific box if needed
      }}>
        {/* Section Label */}
        <span style={{ 
          fontSize: '0.8rem', 
          letterSpacing: '0.4em', 
          textTransform: 'uppercase', 
          opacity: 0.5,
          display: 'block',
          marginBottom: '20px'
        }}>
          01 / Composition
        </span>

        {/* Title */}
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontFamily: "'Playfair Display', serif", 
          fontWeight: '400',
          margin: '0 0 30px 0',
          lineHeight: '1.1'
        }}>
          Digital <br /> Refraction
        </h2>

        {/* Feature List */}
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          <li>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: '500' }}>Light-Weight Glass</h3>
            <p style={{ opacity: 0.7, lineHeight: '1.6', fontSize: '0.95rem' }}>
              Our procedurally generated glass uses high-index refraction to capture 
              every photon in your digital environment.
            </p>
          </li>
          <li>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: '500' }}>Violet Heart</h3>
            <p style={{ opacity: 0.7, lineHeight: '1.6', fontSize: '0.95rem' }}>
              The core essence is rendered with a sub-surface scattering effect, 
              giving it an organic, living glow.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}