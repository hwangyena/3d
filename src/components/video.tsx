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

const myEffect = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: {
      value: new THREE.Vector2(1, window.innerHeight / window.innerWidth),
    },
    uMouse: { value: new THREE.Vector2(-10, -10) },
    uVelo: { value: 0 },
  },
  vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
  fragmentShader: `uniform float time;
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;
        uniform vec2 uMouse;
        float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
          uv -= disc_center;
          uv*=resolution;
          float dist = sqrt(dot(uv, uv));
          return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        }
        void main()  {
            vec2 newUV = vUv;
            float c = circle(vUv, uMouse, 0.0, 0.2);
            float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;
            float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;
            float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;
            vec4 color = vec4(r, g, b, 1.);

            gl_FragColor = color;
        }`,
};

extend({ EffectComposer, RenderPass, ShaderPass });

const Video = () => {
  // const size = useAspect(1000, 1000); //????????????
  const { scene, gl, size, camera, viewport } = useThree();
  const ref = useRef<MeshProps>(); //mesh
  const composer = useRef(); //effect

  //mouse event
  const position = useRef(new THREE.Vector2());
  const speed = useRef(0);
  const targetSpeed = useRef(0);
  const followMouse = useRef(new THREE.Vector2());
  const prevMouse = useRef(new THREE.Vector2());

  //mouse event
  const uMouse = useRef(new THREE.Vector2());

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

    //????????? ?????? ?????? ??????
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

    //shadow ?????? ???????????????
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
      <effectComposer ref={composer.current} args={[gl]}>
        <renderPass scene={scene} camera={camera} />
        <shaderPass
          // attachArray="passes"
          renderToScreen
          args={[myEffect]}
          // args={[
          //   {
          //     uniforms: uniform,
          //     vertexShader: postVertex,
          //     fragmentShader: postFragment,
          //   },
          // ]}
        />
      </effectComposer>
      {/* <mesh scale={size} ref={ref} onPointerMove={onMove}> */}
      <mesh
        scale={useAspect(1000, 1000)}
        ref={ref}
        onPointerMove={(e) => {
          uMouse.current.x = e.spaceX / window.innerWidth;
          uMouse.current.y = e.spaceY / window.innerHeight;
        }}
      >
        <planeBufferGeometry />
        <meshBasicMaterial>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
      </mesh>
      {/* <Lights /> */}
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
