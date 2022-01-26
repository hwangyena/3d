import { useEffect, useRef } from "react";
import { SpotLightProps, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";

function Lights() {
  const cursor = useRef<SpotLightProps>(null);
  const { camera, mouse } = useThree();
  // const vec = new THREE.Vector3();

  // const onMouseMove = (event: MouseEvent) => {
  //   const { pageX: x, pageY: y } = event;
  //   if (cursor.current) {
  //     cursor.current.position = new THREE.Vector3(x, y, 0);
  //     // setMousePosition({ x, y });
  //   }
  //   event.stopPropagation();
  // };

  useFrame(({ mouse, camera }) => {
    if (cursor.current && cursor.current.position) {
      // cursor.current.position.lerp(new THREE.Vector3(1, 1, 1), 0.4);
      cursor.current.position.lerp(
        new THREE.Vector3(mouse.x * 350, mouse.y * 450, 0), //현재위치 넣어주면 움직일 거 같은데
        1
      );
      // cursor.current.position.x = lerp(
      //   cursor.current.position.x,
      //   mouse.x * 12,
      //   0.4
      // );
      // cursor.current.position.y = lerp(
      //   cursor.current.position.y,
      //   7 + mouse.y * 4,
      //   0.4
      // );
      // cursor.current.position.x = THREE.MathUtils.
      // cursor.current.position.y = lerp(cursor.current.position.y, 7 + mouse.y * 4, 0.4)
      // .unproject(camera);
    }
  });

  return (
    <>
      <mesh ref={cursor}>
        <planeGeometry attach="geometry" args={[50, 50]} />
        <meshBasicMaterial color="pink" />
      </mesh>
    </>
  );
}

export default Lights;
