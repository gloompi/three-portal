import React, { useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { BufferAttribute } from "three";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const FireFlies = ({ count = 30 }) => {
  const sparklesMaterial = useRef();
  const points = useMemo(() => {
    const p = Array.from({ length: count * 3 });

    Array.from({ length: count }).forEach((_, idx) => {
      p[idx * 3 + 0] = (0.5 - Math.random()) * 4;
      p[idx * 3 + 1] = Math.random() * 1.5;
      p[idx * 3 + 2] = (0.5 - Math.random()) * 4;
    });

    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);

  useFrame((_, delta) => (sparklesMaterial.current.uTime += delta));

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <sparklesMaterial
        ref={sparklesMaterial}
        uPixelRatio={Math.min(window.devicePixelRatio, 2)}
      />
    </points>
  );
};

extend({
  SparklesMaterial: shaderMaterial(
    {
      uTime: 0,
      uPixelRatio: Math.min(window.devicePixelRatio, 2),
    },
    vertex,
    fragment
  ),
});

export default FireFlies;
