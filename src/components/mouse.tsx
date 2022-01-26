import { CSSProperties } from "@emotion/serialize";
import styled from "@emotion/styled";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid blue;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
  color: transparent;
  left: var(--x-pos);
  top: var(--y-pos);

  /* left: var(--x-pos) + "px";
  top: var(--y-pos) + "px"; */
`;

// interface Props {
//   children: ReactNode;
// }

/** 그냥 따라다니는 기본 mouse cursor */
const Mouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const onMouseMove = (event: MouseEvent) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.addEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <Wrapper
      style={{
        ["--x-pos" as keyof CSSProperties]: mousePosition.x + "px",
        ["--y-pos" as keyof CSSProperties]: mousePosition.y + "px",
      }}
    />
  );
};

export default Mouse;
