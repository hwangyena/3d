import React, { useRef } from "react";
import { MeshProps } from "react-three-fiber";

const Plane = (props: MeshProps) => {
  const ref = useRef();

  return (
    <mesh
      ref={ref}
      onClick={() => {}}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry attach="geometry" args={[50, 50]} />
      <meshLambertMaterial attach="material" color="skyblue" />
      {/* <boxBufferGeometry attach='geometry'  />
      <meshStandardMaterial attach='material' color='pink' /> */}
    </mesh>
  );
};

export default Plane;
