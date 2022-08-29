import React from "react";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

// import useDatGui, { DatProvider } from "./hooks/useDatGui";
import CameraController from "./components/CameraController";
import FireFlies from "./components/FireFlies";
import Scene from "./components/Scene";

export default function App() {
  const { backgroundColor } = useControls({ backgroundColor: "#000000" });

  return (
    <Canvas>
      <color attach="background" args={[backgroundColor]} />
      <CameraController />
      <FireFlies />
      <Scene />
    </Canvas>
  );
}
