import { useMemo, useRef, useState } from "react";
import {
  MeshProps,
  ReactThreeFiber,
  ThreeEvent,
  useFrame,
  useThree,
} from "react-three-fiber";

const Box = (props: MeshProps) => {
  const mesh = useRef<any>();

  // useFrame(
  //   () => (mesh.current.rotation.y += 0.01) //0.01초 마다 위치 변경
  // );

  return (
    <mesh {...props} ref={mesh} position={[0, 1, 0]}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial color="#008cff" attach="material" />
    </mesh>
  );
};

export default Box;

/**
 *
 * Geometry : triangular polygon, 모델의 모양
 * Material : model 외관
 *
 */
