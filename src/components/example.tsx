import { useAspect } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  extend,
  MeshProps,
  render,
  useFrame,
  useThree,
} from "react-three-fiber";
import * as THREE from "three";
import { Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

// import fragment from "../shader/material/fragment.glsl?raw";
// import vertex from "../shader/material/vertex.glsl?raw";

// const myEffect = {
//   uniforms: {
//     tDiffuse: { value: null },
//     resolution: {
//       value: new THREE.Vector2(1, window.innerHeight / window.innerWidth),
//     },
//     uMouse: { value: new THREE.Vector2(-10, -10) },
//     uVelo: { value: 0 },
//   },
//   vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
//   fragmentShader: `uniform float time;
//         uniform sampler2D tDiffuse;
//         uniform vec2 resolution;
//         varying vec2 vUv;
//         uniform vec2 uMouse;
//         float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
//           uv -= disc_center;
//           uv*=resolution;
//           float dist = sqrt(dot(uv, uv));
//           return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
//         }
//         void main()  {
//             vec2 newUV = vUv;
//             float c = circle(vUv, uMouse, 0.0, 0.2);
//             float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;
//             float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;
//             float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;
//             vec4 color = vec4(r, g, b, 1.);

//             gl_FragColor = color;
//         }`,
// };

const Effect = ({ uMouse }: { uMouse: Vector2 }) => {
  const { scene, gl, size, camera, viewport } = useThree();
  const customPass = useRef<ShaderPass>();

  const [comp] = useMemo(() => {
    const renderScene = new RenderPass(scene, camera);
    const comp = new EffectComposer(gl);
    comp.addPass(renderScene);

    customPass.current = new ShaderPass(
      new THREE.ShaderMaterial({
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
      })
    );
    customPass.current.renderToScreen = true;
    comp.addPass(customPass.current);

    return [comp];
  }, []);

  useEffect(() => {
    comp.setSize(size.width, size.height);
  }, [comp]);

  useFrame(() => {
    // scene.traverse()
    comp.render();
    if (customPass.current) {
      customPass.current.uniforms.uMouse.value = uMouse;
      console.log("uMouse", uMouse);
    }
  }, 1);

  return null;
};

const Example = () => {
  // const size = useAspect(1000, 1000); //비율주기
  const { viewport } = useThree();
  const ref = useRef<MeshProps>(); //mesh

  //mouse event
  const uMouse = useRef(new THREE.Vector2());

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

  useFrame(({ mouse }) => {
    // const x = ;
    // const y = ;
    uMouse.current.x = mouse.x * 0.7 + 0.4;
    uMouse.current.y = mouse.y * 0.7 + 0.5;
  }, 1);

  useEffect(() => {
    if (video) void video.play();
  }, [video]);

  return (
    <>
      <Effect uMouse={uMouse.current} />
      {/* <mesh scale={size} ref={ref} onPointerMove={onMove}> */}
      <mesh
        scale={useAspect(1000, 1000)}
        ref={ref}
        // onPointerMove={(e) => {
        //   uMouse.current.x = e. / window.innerWidth;
        //   uMouse.current.y = e.spaceY / window.innerHeight;
        // }}
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

export default Example;
