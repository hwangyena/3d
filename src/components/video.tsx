import { useAspect } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { MeshProps, useFrame, useThree } from "react-three-fiber";
import Lights from "./lights";
import Mouse from "./mouse";

interface Props {}

const Video = ({}: Props) => {
  const size = useAspect(1000, 1000); //비율주기
  const ref = useRef<MeshProps>();

  const targetX = 0;
  const targetY = 0;

  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/public/car.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.autoplay = true;
    vid.muted = true;
    vid.className = "video";
    return vid;
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
      {/* <Mouse /> */}
      <Lights />
    </group>
  );
};

export default Video;
