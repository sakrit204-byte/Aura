import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, MeshTransmissionMaterial, Float, Environment, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FLAVORS = [
  { name: "AURA ESSENCE", color: "#e67e22" },
  { name: "VIBE ESSENCE", color: "#8352fd" },
  { name: "GREEN APPLE", color: "#76ff03" },
  { name: "TOXIC STRAWBERRY", color: "#ff1744" }
];

export default function Scene() {
  const group = useRef();
  const liquidRef = useRef();
  const scroll = useScroll();
  const { gl } = useThree();

  const [flavorIndex, setFlavorIndex] = useState(0);
  const touchStart = useRef(0);

  const isDragging = useRef(false);
  let isAnimating = false;

  // 🔥 ADD TO CART ANIMATION
  function animateToCart() {
    if (isAnimating) return;
    isAnimating = true;

    const canvas = gl.domElement;
    const image = canvas.toDataURL('image/png');

    const img = document.createElement('img');
    img.src = image;

    const rect = canvas.getBoundingClientRect();

    Object.assign(img.style, {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      zIndex: 999999,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
      borderRadius: '12px'
    });

    document.body.appendChild(img);

    const cart = document.getElementById('global-cart');
    if (!cart) return;

    const cartRect = cart.getBoundingClientRect();

    requestAnimationFrame(() => {
      img.style.left = `${cartRect.left}px`;
      img.style.top = `${cartRect.top}px`;
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.opacity = '0.7';
      img.style.transform = 'scale(0.2) rotate(10deg)';
    });

    setTimeout(() => {
      img.remove();
      isAnimating = false;
    }, 800);
  }

  // 🔗 expose to global
  useEffect(() => {
    window.addToCart3D = animateToCart;
  }, []);

  // ✅ SWIPE ONLY ON HERO SECTION
  useEffect(() => {
    const interval = setInterval(() => {
      const target = window.heroSection;
      if (!target) return;

      clearInterval(interval);

      const handleStart = (e) => {
        isDragging.current = true;
        touchStart.current = e.clientX || e.touches?.[0].clientX;
      };

      const handleMove = (e) => {
        if (!isDragging.current) return;

        const currentX = e.clientX || e.touches?.[0].clientX;
        const distance = currentX - touchStart.current;

        if (distance > 80) {
          setFlavorIndex((prev) => (prev + 1) % FLAVORS.length);
          touchStart.current = currentX;
        }

        if (distance < -80) {
          setFlavorIndex((prev) => (prev - 1 + FLAVORS.length) % FLAVORS.length);
          touchStart.current = currentX;
        }
      };

      const handleEnd = () => {
        isDragging.current = false;
      };

      target.addEventListener("mousedown", handleStart);
      target.addEventListener("mousemove", handleMove);
      target.addEventListener("mouseup", handleEnd);

      target.addEventListener("touchstart", handleStart);
      target.addEventListener("touchmove", handleMove);
      target.addEventListener("touchend", handleEnd);

      // cleanup
      return () => {
        target.removeEventListener("mousedown", handleStart);
        target.removeEventListener("mousemove", handleMove);
        target.removeEventListener("mouseup", handleEnd);

        target.removeEventListener("touchstart", handleStart);
        target.removeEventListener("touchmove", handleMove);
        target.removeEventListener("touchend", handleEnd);
      };
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // 🎨 SHADER
  const fluidMaterial = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(FLAVORS[0].color) },
      uIntensity: { value: 0 },
    },
    vertexShader: `
      varying vec3 vPosition;
      uniform float uTime;
      uniform float uIntensity;
      void main() {
        vec3 pos = position;
        float wave = sin(pos.y * 3.0 + uTime * 2.0) * (pos.y + 1.0) * 0.1 * uIntensity;
        pos.x += wave;
        pos.z += cos(uTime * 1.5) * (pos.y + 1.0) * 0.05 * uIntensity;
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      uniform vec3 uColor;
      void main() {
        float mixFactor = (vPosition.y + 1.0) / 2.0;
        vec3 color = mix(uColor * 0.2, uColor * 1.5, mixFactor);
        float fresnel = pow(1.0 - abs(vPosition.z), 2.0);
        color += uColor * fresnel * 0.6;
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);

  // 🎬 FRAME LOOP
  useFrame((state) => {
  const offset = scroll.offset;

  const prevX = group.current.position.x;
  const targetX = offset * -2;
  const velocity = Math.abs(targetX - prevX);

  // ✅ horizontal movement (scroll)
  group.current.position.x = THREE.MathUtils.lerp(prevX, targetX, 0.1);

  // ✅ COMBINED ROTATION (scroll + flavor + mouse)
  const scrollRotation = offset * Math.PI * 2;
  const flavorRotation = flavorIndex * (Math.PI / 6); // subtle effect

  group.current.rotation.y = THREE.MathUtils.lerp(
    group.current.rotation.y,
    scrollRotation + flavorRotation + (state.mouse.x * 0.2),
    0.1
  );

  // 🎨 smooth color transition
  const targetColor = new THREE.Color(FLAVORS[flavorIndex].color);
  fluidMaterial.uniforms.uColor.value.lerp(targetColor, 0.08);

  // 🌊 liquid animation
  fluidMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  fluidMaterial.uniforms.uIntensity.value = THREE.MathUtils.lerp(
    fluidMaterial.uniforms.uIntensity.value,
    velocity * 15.0 + 0.3,
    0.1
  );
});
  return (
    <>
      <color attach="background" args={['#ffffff']} />

      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={group} onClick={animateToCart}>

          {/* GLASS */}
          <mesh scale={[1.2, 1.6, 1.2]}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial transmission={1} ior={1.6} roughness={0} />
          </mesh>

          {/* LIQUID */}
          <mesh ref={liquidRef} position={[0, -0.1, 0]} scale={[1.05, 1.45, 1.05]}>
            <icosahedronGeometry args={[1, 0]} />
            <shaderMaterial args={[fluidMaterial]} />
          </mesh>

          {/* CAP */}
          <group position={[0, 1.6, 0]}>
            <mesh>
              <cylinderGeometry args={[0.45, 0.45, 0.15, 32]} />
              <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#ffdf00" metalness={1} roughness={0.1} />
            </mesh>
          </group>

          {/* LABEL */}
          <group position={[0, -0.2, 0.65]}>
            <Text fontSize={0.12} color="black" anchorX="center">
              AURA
            </Text>
            <Text 
              position={[0, -0.15, -0.01]} 
              fontSize={0.06} 
              color="black" 
              opacity={0.7}
              anchorX="center"
            >
              {FLAVORS[flavorIndex].name}
            </Text>
          </group>

        </group>
      </Float>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} />
    </>
  );
}