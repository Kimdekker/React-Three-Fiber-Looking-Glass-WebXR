import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { XR, VRButton } from '@react-three/xr';
import { LookingGlassWebXRPolyfill, LookingGlassConfig } from '@lookingglass/webxr';

// Configure Looking Glass settings
const config = LookingGlassConfig;
config.tileHeight = 512;
config.numViews = 45;
config.targetY = 0;
config.targetZ = 0;
config.targetDiam = 3;
config.fovy = (14 * Math.PI) / 180;

// Initialize Looking Glass WebXR Polyfill
new LookingGlassWebXRPolyfill();

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Rotate the box every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function App() {
  return (
    <>
      {/* Add the VR Button to the DOM */}
      <VRButton />
      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </XR>
      </Canvas>
    </>
  );
}
