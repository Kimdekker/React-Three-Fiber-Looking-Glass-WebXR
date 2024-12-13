// import { useRef, useState, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { XR, createXRStore } from '@react-three/xr'
// import { LookingGlassWebXRPolyfill, LookingGlassConfig } from '@lookingglass/webxr';

// // Configure Looking Glass settings
// const config = LookingGlassConfig;
// config.tileHeight = 512;
// config.numViews = 45;
// config.targetY = 0;
// config.targetZ = 0;
// config.targetDiam = 3;
// config.fovy = (14 * Math.PI) / 180;

// function Box(props) {
//   const ref = useRef();
//   const [hovered, hover] = useState(false);
//   const [clicked, click] = useState(false);

//   // Rotate the box every frame
//   useFrame((state, delta) => (ref.current.rotation.x += delta));

//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 1.5 : 1}
//       onClick={() => click(!clicked)}
//       onPointerOver={() => hover(true)}
//       onPointerOut={() => hover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   );
// }

// export default function App() {
//   useEffect(() => {
//     // Initialize the Looking Glass WebXR Polyfill on mount
//     new LookingGlassWebXRPolyfill();
//   }, []);

//   // Step 1: Create the XR store
//   const store = createXRStore({
//     // You can configure the store options here if needed
//     someOption: 'value', // Example of options if needed
//   });

//   return (
//     <>
//       {/* Step 2: Pass the store to the VRButton */}
//       <button onClick={() => store.enterAR()}>Enter AR</button>

//       {/* Step 3: Pass the store to the XR component */}
//       <Canvas>
//         <XR store={store}> {/* Pass the store here */}
//           <ambientLight intensity={0.5} />
//           <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//           <pointLight position={[-10, -10, -10]} />
//           <Box position={[-1.2, 0, 0]} />
//           <Box position={[1.2, 0, 0]} />
//         </XR>
//       </Canvas>
//     </>
//   );
// }


import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { useState } from 'react'
import { LookingGlassWebXRPolyfill, LookingGlassConfig } from "@lookingglass/webxr"
const config = LookingGlassConfig
config.targetY = 0
config.targetZ = 0
config.targetDiam = 3
config.fovy = (40 * Math.PI) / 180
new LookingGlassWebXRPolyfill()

const store = createXRStore()

export default function App() {
  const [red, setRed] = useState(false)

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          <mesh onClick={() => setRed(!red)} position={[0, 1, -1]}>
            <boxGeometry />
            <meshBasicMaterial color={red ? 'red' : 'blue'} />
          </mesh>
        </XR>
      </Canvas>
    </>
  )
}