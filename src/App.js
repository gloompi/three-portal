import React from "react";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";

// import useDatGui, { DatProvider } from "./hooks/useDatGui";
import CameraController from "./components/CameraController";
import FireFlies from "./components/FireFlies";
import Scene from "./components/Scene";

export default function App() {
  const { backgroundColor } = useControls({ backgroundColor: "#4b486c" });

  return (
    <>
      <Leva collapsed />
      <Canvas camera={{ position: [3.2, 1.8, 2.3] }}>
        <color attach="background" args={[backgroundColor]} />
        <CameraController />
        <FireFlies />
        <Scene />
      </Canvas>
    </>
  );
}
