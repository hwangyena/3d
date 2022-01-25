import { useCursor } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const Frame = ({ url, c = new THREE.Color(), ...props }) => {
  const [hover, setHover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const image = useRef();
  const frame = useRef();

  useCursor(hovered); //마우스가 들어올 때 효과줄 수 있음
  //이미지 내에서 움직이는 animation
  // useFrame((state) => {
  //   image.current.material.zoom =
  //     2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
  // });

  return (
    <group {...props}>
      <mesh
        onPointerOver={((e) => e.stopPropagation(), setHover(true))}
        onPointerOut={() => setHover(false)}
        scale={[1, 1, 0.3]}
        position={[0, 0, 0]}
      >
        <boxGeometry />
        {/* 프레임의 바깥부분 */}
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        {/* <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        ></mesh> */}
      </mesh>
    </group>
  );
};
