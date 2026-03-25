// src/components/Hero.jsx
import React from 'react';

export default function Hero() {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '60px 8%',
      boxSizing: 'border-box',
      color: 'white',
      pointerEvents: 'none' // Crucial: allows mouse to interact with 3D bottle "behind" the text
    }}>
      {/* Top Navigation Bar Branding */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ 
          fontSize: '1.2rem', 
          letterSpacing: '0.5em', 
          fontWeight: '300',
          margin: 0 
        }}>
          VIBE®
        </h2>
        <div style={{ 
          fontSize: '0.8rem', 
          letterSpacing: '0.2em', 
          opacity: 0.6,
          textTransform: 'uppercase'
        }}>
          EST. 2026 / DIGITAL FRAGRANCE
        </div>
      </div>

      {/* Main Hero Text */}
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ 
          fontSize: 'clamp(4rem, 12vw, 8rem)', 
          lineHeight: '0.9', 
          margin: '0 0 20px 0',
          fontFamily: "'Playfair Display', serif", // Ensure you have this font or use 'serif'
          fontWeight: '400',
          letterSpacing: '-0.02em'
        }}>
          ESSENCE.
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          maxWidth: '400px', 
          lineHeight: '1.6', 
          opacity: 0.7,
          letterSpacing: '0.02em'
        }}>
          A scent captured in translucent geometry. Designed for the minimalist soul, 
          rendered in the digital ether.
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ 
          width: '1px', 
          height: '60px', 
          background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
          opacity: 0.5 
        }}></div>
        <span style={{ 
          fontSize: '0.7rem', 
          letterSpacing: '0.3em', 
          opacity: 0.4, 
          textTransform: 'uppercase' 
        }}>
          Scroll to explore
        </span>
      </div>
    </div>
  );
}