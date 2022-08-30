import React, { useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";
import { useControls } from "leva";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const COLORS = Object.freeze({
  COLOR_START: "#fffdd8",
  COLOR_END: "#676490",
});

const Portal = ({ portalGeometry }) => {
  const { colorStart, colorEnd } = useControls({
    colorStart: COLORS.COLOR_START,
    colorEnd: COLORS.COLOR_END,
  });
  const portalMaterial = useRef();

  useFrame((_, delta) => (portalMaterial.current.uTime += delta));

  const uColorStart = useMemo(() => new Color(colorStart), [colorStart]);
  const uColorEnd = useMemo(() => new Color(colorEnd), [colorEnd]);

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={portalGeometry}
      position={[0, 0.98, -1.51]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <portalMaterial
        ref={portalMaterial}
        uColorStart={uColorStart}
        uColorEnd={uColorEnd}
      />
    </mesh>
  );
};

extend({
  PortalMaterial: shaderMaterial(
    {
      uTime: 0,
      uColorStart: { value: new Color(COLORS.COLOR_START) },
      uColorEnd: { value: new Color(COLORS.COLOR_END) },
    },
    vertex,
    fragment
  ),
});

export default Portal;
