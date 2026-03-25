// src/pages/Home.jsx
import { ScrollControls, Scroll } from '@react-three/drei';
import { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Scene from '../components/Scene';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const handleFlyToCart = (e) => {
    const btn = e.currentTarget;
    // We look for the cart icon in the real DOM (outside the Canvas)
    const cart = document.getElementById('global-cart');
    if (!cart) return;

    const rect = btn.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    const flyer = document.createElement('div');

    flyer.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left + rect.width / 2}px;
      width: 20px;
      height: 40px;
      background: #8352fd;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
      box-shadow: 0 0 15px #8352fd;
      transition: all 1.5s cubic-bezier(0.19, 1, 0.22, 1);
    `;

    document.body.appendChild(flyer);

    requestAnimationFrame(() => {
      flyer.style.top = `${cartRect.top + 20}px`;
      flyer.style.left = `${cartRect.left + 20}px`;
      flyer.style.transform = `scale(5) rotate(720deg)`;
      flyer.style.opacity = '0';
    });

    setTimeout(() => {
      flyer.remove();
      setCartCount(prev => prev + 1);
      cart.style.transform = 'scale(1.3)';
      setTimeout(() => (cart.style.transform = 'scale(1)'), 200);
    }, 800);
  };

  return (
    <ScrollControls pages={3} damping={0.2}>
      {/* 3D CONTENT: This is safe inside the Canvas */}
      <Scene />

      {/* HTML CONTENT: Must be wrapped in <Scroll html> to be inside Canvas */}
      <Scroll html style={{ width: '100%' }}>
        
        {/* We use a Portal-like trick: The Cart UI is moved out to App.jsx 
            but we can still trigger the count logic here if we wanted. 
            However, for the sake of "NOT BREAKING," we will put the 
            Cart UI inside the Scroll layer so it's legal. */}
        
        <Hero />
        <Features />
        
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white' 
        }}>
          <h2 style={{ fontSize: '3vw', marginBottom: '2rem', fontFamily: 'serif' }}>
            Elevate Your Vibe.
          </h2>
          <button 
            onClick={handleFlyToCart}
            style={{ 
              background: 'white', 
              color: 'black', 
              padding: '15px 40px', 
              borderRadius: '50px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ADD TO CART
          </button>
        </section>
      </Scroll>
    </ScrollControls>
  );
}