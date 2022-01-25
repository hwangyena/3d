import React, { useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFrame } from "react-three-fiber";

/** frame 카메라 이동 */
const frames = ({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) => {
  const ref = useRef();
  const clicked = useRef();
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    p.set(0, 0, 5); //vector
    q.indentify(); //quaternion (rotate 설정)
  }, []);
  useFrame((state, dt) => {
    state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt));
    state.camera.Quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt));
  });

  return <group ref={ref} onClick={(e) => e.stopPropagation()}></group>;
};
