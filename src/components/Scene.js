import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshBasicMaterial, sRGBEncoding } from "three";

const Scene = (props) => {
  const { nodes } = useGLTF("/models/portal/portal.glb");
  const texture = useLoader(TextureLoader, "/models/portal/baked.jpg");
  const material = useMemo(
    () => new MeshBasicMaterial({ map: texture }),
    [texture]
  );
  const emmissionMaterial = useMemo(
    () => new MeshBasicMaterial({ color: 0xffffe5 }),
    []
  );
  const portalLightMaterial = useMemo(
    () => new MeshBasicMaterial({ color: 0xffffe5 }),
    []
  );

  texture.flipY = false;
  texture.encoding = sRGBEncoding;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EmmissionPoleA.geometry}
        material={emmissionMaterial}
        position={[0.72, 1.35, 0.44]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EmmissionPoleB.geometry}
        material={emmissionMaterial}
        position={[-0.72, 1.35, 0.37]}
        rotation={[Math.PI, 0, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EmmissionPortal.geometry}
        material={portalLightMaterial}
        position={[0, 0.98, -1.51]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.baked.geometry}
        material={material}
      />
    </group>
  );
};

useGLTF.preload("/portal.glb");

export default Scene;
