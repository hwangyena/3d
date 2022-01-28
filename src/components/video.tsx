import { useAspect } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { extend, MeshProps, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

import postFragment from "../shader/post/fragment.glsl?raw";
import postVertex from "../shader/post/vertex.glsl?raw";

// import fragment from "../shader/material/fragment.glsl?raw";
// import vertex from "../shader/material/vertex.glsl?raw";
import { Vector2 } from "three";

extend({ EffectComposer, RenderPass, ShaderPass });

const Video = () => {
  // const size = useAspect(1000, 1000); //비율주기
  const { scene, gl, size, camera, viewport } = useThree();
  const ref = useRef<MeshProps>(); //mesh
  const composer = useRef(); //effect

  //mouse event
  const position = useRef(new THREE.Vector2());
  const speed = useRef(0);
  const targetSpeed = useRef(0);
  const followMouse = useRef(new THREE.Vector2());
  const prevMouse = useRef(new THREE.Vector2());

  /** custom effect */
  const uniform = useMemo(
    () => ({
      tDiffuse: { value: null },
      distort: { value: 0 },
      resolution: {
        value: new THREE.Vector2(1, window.innerHeight / window.innerWidth),
      },
      uMouse: { value: followMouse },
      uVelo: { value: Math.min(targetSpeed.current, 0.05) },
      uScale: { value: 0 },
      uType: { value: 0 },
      time: { value: 0 },
    }),
    []
  );

  /** video texture */
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/public/car.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.autoplay = true;
    vid.muted = true;
    return vid;
  });

  /** shader */
  // const shaderData: THREE.ShaderMaterialParameters = useMemo(
  //   () => ({
  //     uniforms: {
  //       time: { value: 0 },
  //       progress: { value: 0 },
  //       angle: { value: 0 },
  //       texture1: { value: null },
  //       texture2: { value: null },
  //       resolution: { value: new THREE.Vector4() },
  //       uvRate1: {
  //         value: new THREE.Vector2(1, 1),
  //       },
  //     },
  //     side: THREE.DoubleSide,
  //     transparent: true,
  //     vertexShader: vertex,
  //     fragmentShader: fragment,
  //   }),
  //   []
  // );

  useFrame(({ mouse }) => {
    // const x = (mouse.x * viewport.width) / 2;
    // const y = (mouse.y * viewport.height) / 2;
    position.current.x = mouse.x;
    position.current.y = mouse.y;

    //마우스 이동 속도 확인
    speed.current = Math.sqrt(
      (prevMouse.current.x - position.current.x) ** 2 +
        (prevMouse.current.y - position.current.y) ** 2
    );

    targetSpeed.current -= 0.1 * (targetSpeed.current - speed.current);
    followMouse.current.x -= 0.1 * (followMouse.current.x - position.current.x);
    followMouse.current.y -= 0.1 * (followMouse.current.y - position.current.y);

    prevMouse.current.x = position.current.x;
    prevMouse.current.y = position.current.y;

    console.log("x", position.current.x);

    //shadow 우선 제외해보기
    // if (shaderData.uniforms) {
    //   shaderData.uniforms.resolution.value.x = 100;
    //   shaderData.uniforms.resolution.value.y = 100;
    //   shaderData.uniforms.resolution.value.z = 1;
    //   shaderData.uniforms.resolution.value.w = 2;
    //   shaderData.uniforms.progress.value = 0;
    //   shaderData.uniforms.angle.value = 0.3;

    //   shaderData.uniforms.texture1.value = video;
    //   shaderData.uniforms.texture1.value.needsUpdate = true;
    // }
  });

  useEffect(() => {
    if (video) void video.play();
  }, [video]);

  return (
    <>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <shaderPass
          attachArray="passes"
          renderToScreen
          args={[
            {
              uniforms: uniform,
              vertexShader: postVertex,
              fragmentShader: postFragment,
            },
          ]}
        />
      </effectComposer>
      <group>
        <mesh scale={useAspect(1000, 1000)} ref={ref}>
          {/* <mesh scale={size} ref={ref} onPointerMove={onMove}> */}
          <planeBufferGeometry />
          <meshBasicMaterial>
            <videoTexture attach="map" args={[video]} />
          </meshBasicMaterial>
        </mesh>
        {/* <Lights /> */}
      </group>
    </>
  );
};

export default Video;

// <shaderMaterial
// {...shaderData}
// extensions={{
//   // derivatives: "#extension GL_OES_standard_derivatives : enable", //?
//   derivatives: true, //?
//   fragDepth: false,
//   drawBuffers: false,
//   shaderTextureLOD: false,
// }}
// ></shaderMaterial>
