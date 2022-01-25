import { useAspect } from "@react-three/drei";
import { useEffect, useState } from "react";

interface Props {}

const Video = ({}: Props) => {
  const size = useAspect(1800, 1000); //비율주기

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/public/car.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    return vid;
  });

  useEffect(() => void video.play(), [video]);
  return (
    <mesh scale={size}>
      <planeBufferGeometry />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
};

export default Video;
