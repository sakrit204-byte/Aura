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
      color: '#1a1a1a', // ✅ Dark text for white bg
      pointerEvents: 'none'
    }}>
      
      {/* Top Branding */}
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
          opacity: 0.5,
          textTransform: 'uppercase'
        }}>
          EST. 2026 / DIGITAL FRAGRANCE
        </div>
      </div>

      {/* Main Hero Content */}
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ 
          fontSize: 'clamp(4rem, 12vw, 8rem)', 
          lineHeight: '0.9', 
          margin: '0 0 20px 0',
          fontFamily: "'Playfair Display', serif",
          fontWeight: '400',
          letterSpacing: '-0.02em'
        }}>
          ESSENCE.
        </h1>

        <p style={{ 
          fontSize: '1.1rem', 
          maxWidth: '420px', 
          lineHeight: '1.6', 
          opacity: 0.65,
          letterSpacing: '0.02em'
        }}>
          A scent captured in translucent geometry. Designed for the minimalist soul, 
          rendered in the digital ether.
        </p>
      </div>

      {/* Scroll Indicator */}
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.2))',
          opacity: 0.6 
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