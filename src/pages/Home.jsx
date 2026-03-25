// src/pages/Home.jsx
import { ScrollControls, Scroll } from '@react-three/drei';
import { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Scene from '../components/Scene';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    if (window.addToCart3D) {
      window.addToCart3D();
    }

    setCartCount(prev => prev + 1);

    const cart = document.getElementById('global-cart');
    if (cart) {
      cart.style.transform = 'scale(1.25)';
      setTimeout(() => (cart.style.transform = 'scale(1)'), 200);
    }
  };

  return (
    <ScrollControls pages={3} damping={0.2}>
      <Scene />

      <Scroll html style={{ width: '100%' }}>
        <Hero />
        <Features />

        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#111'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            marginBottom: '2rem', 
            fontFamily: "'Playfair Display', serif"
          }}>
            Elevate Your Vibe.
          </h2>

          <button 
            onClick={handleAddToCart}
            style={{ 
              background: '#111',
              color: '#fff', 
              padding: '16px 44px', 
              borderRadius: '50px',
              border: 'none',
              letterSpacing: '0.15em',
              cursor: 'pointer'
            }}
          >
            ADD TO CART
          </button>

          <div 
            id="global-cart"
            style={{
              position: 'fixed',
              top: '25px',
              right: '40px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#111',
              background: 'rgba(255,255,255,0.8)',
              padding: '10px 18px',
              borderRadius: '30px',
              zIndex: 10000,
              transition: 'transform 0.2s ease'
            }}
          >
            🛒 {cartCount}
          </div>
        </section>
      </Scroll>
    </ScrollControls>
  );
}