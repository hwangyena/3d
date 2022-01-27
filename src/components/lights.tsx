import { Ring } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { SpotLightProps, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { Texture, Vector3 } from "three";

function Lights() {
  const cursor = useRef<SpotLightProps>(null);

  useFrame(({ mouse, camera }) => {
    if (cursor.current && cursor.current.position) {
      // @ts-ignore
      cursor.current.position.lerp(
        new THREE.Vector3(
          (mouse.x * window.innerWidth) / 2,
          (mouse.y * window.innerHeight) / 2,
          0
        ),
        1
      );
    }
  });

  return (
    <>
      <mesh ref={cursor}>
        <ringBufferGeometry args={[40, 200, 50]} />
        {/* <planeGeometry attach="geometry" args={[50, 50]} /> */}
        <meshBasicMaterial
          attach="material"
          opacity={0.5}
          color="pink"
          alphaMap={new THREE.TextureLoader().load("public/alpha-1.png")}
          side={THREE.DoubleSide}
          alphaTest={0.2}

          // blending={THREE.CustomBlending}
          // blendEquation={THREE.AddEquation}
          // transparent={true}
        />
        {/* <meshBasicMaterial attach="material" color="blue" /> */}
      </mesh>
    </>
  );
}

export default Lights;
