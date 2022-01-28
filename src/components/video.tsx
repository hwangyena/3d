import { useAspect } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { MeshProps, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

import fragment from "../shader/fragment.glsl?raw";
import vertex from "../shader/vertex.glsl?raw";

const EffectObject = () => {
  const shaderData: THREE.ShaderMaterialParameters = useMemo(
    () => ({
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        angle: { value: 0 },
        texture1: { value: null },
        texture2: { value: null },
        resolution: { value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      side: THREE.DoubleSide,
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    }),
    []
  );
  return (
    <mesh>
      <planeBufferGeometry />
      <shaderMaterial
        {...shaderData}
        extensions={{
          // derivatives: "#extension GL_OES_standard_derivatives : enable", //?
          derivatives: true, //?
          fragDepth: false,
          drawBuffers: false,
          shaderTextureLOD: false,
        }}
      />
    </mesh>
  );
};

const Video = () => {
  const size = useAspect(1000, 1000); //비율주기
  const ref = useRef<MeshProps>();
  const mouse = useRef(new THREE.Vector2());

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/public/car.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.autoplay = true;
    vid.muted = true;
    return vid;
  });

  useFrame(({ mouse }) => {
    mouse.x = (mouse.x * window.innerWidth) / 2;
    mouse.y = (mouse.y * window.innerHeight) / 2;
  });

  useEffect(() => {
    if (video) void video.play();
  }, [video]);

  return (
    <group>
      <mesh scale={size} ref={ref}>
        {/* <mesh scale={size} ref={ref} onPointerMove={onMove}> */}
        <planeBufferGeometry />
        <meshBasicMaterial>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
      </mesh>
      {/* <Lights /> */}
    </group>
  );
};

export default Video;
