import React, { useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { AdditiveBlending, BufferAttribute, Color } from "three";
import { useControls } from "leva";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const FLIES_COLOR = "#abf8a8";

const FireFlies = ({ count = 30 }) => {
  const { color, pointSize } = useControls({
    color: FLIES_COLOR,
    pointSize: {
      value: 90,
      min: 0,
      max: 500,
      step: 1,
    },
  });
  const sparklesMaterial = useRef();
  const { points, aScale } = useMemo(() => {
    const p = Array.from({ length: count * 3 });
    const s = Array.from({ length: count });

    Array.from({ length: count }).forEach((_, idx) => {
      p[idx * 3 + 0] = (0.5 - Math.random()) * 4;
      p[idx * 3 + 1] = Math.random() * 1.5;
      p[idx * 3 + 2] = (0.5 - Math.random()) * 4;

      s[idx] = Math.random();
    });

    return {
      points: new BufferAttribute(new Float32Array(p), 3),
      aScale: new BufferAttribute(new Float32Array(s), 1),
    };
  }, [count]);

  const uColor = useMemo(() => new Color(color), [color]);

  useFrame((_, delta) => (sparklesMaterial.current.uTime += delta));

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
        <bufferAttribute attach={"attributes-aScale"} {...aScale} />
      </bufferGeometry>
      <sparklesMaterial
        ref={sparklesMaterial}
        uSize={pointSize}
        uColor={uColor}
        uPixelRatio={Math.min(window.devicePixelRatio, 2)}
        blending={AdditiveBlending}
        depthWrite={false}
        transparent
      />
    </points>
  );
};

extend({
  SparklesMaterial: shaderMaterial(
    {
      uTime: 0,
      uSize: 0,
      uColor: new Color(FLIES_COLOR),
      uPixelRatio: Math.min(window.devicePixelRatio, 2),
    },
    vertex,
    fragment
  ),
});

export default FireFlies;
