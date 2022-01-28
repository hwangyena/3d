import { useMemo, useRef } from "react";
import { extend, useThree } from "react-three-fiber";
import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

import postFragment from "../shader/post/fragment.glsl?raw";
import postVertex from "../shader/post/vertex.glsl?raw";

extend({ EffectComposer, RenderPass, ShaderPass });

const Effect = () => {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();

  const uniform = useMemo(
    () => ({
      tDiffuse: { value: null },
      distort: { value: 0 },
      resolution: {
        value: new THREE.Vector2(1, window.innerHeight / window.innerWidth),
      },
      uMouse: { value: new THREE.Vector2(-10, -10) },
      uVelo: { value: 0 },
      uScale: { value: 0 },
      uType: { value: 0 },
      time: { value: 0 },
    }),
    []
  );

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass
        attachArray="passes"
        args={[
          {
            uniforms: uniform,
            vertexShader: postVertex,
            fragmentShader: postFragment,
          },
        ]}
      />
    </effectComposer>
  );
};

export default Effect;
