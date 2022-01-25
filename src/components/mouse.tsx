import { CSSProperties } from "@emotion/serialize";
import styled from "@emotion/styled";
import { ReactNode, useEffect, useRef, useState } from "react";

const Wrapper = styled.div`
  --x-pos: 0;
  --y-pos: 0;

  width: 30px;
  height: 30px;
  z-index: 99999;
  /* transform: translate(-50%, -50%); */
  border-radius: 50%;
  background: #fff;
  position: absolute;
  pointer-events: none;
  left: var(--x-pos);
  top: var(--y-pos);
`;

// interface Props {
//   children: ReactNode;
// }

/** 그냥 따라다니는 기본 mouse cursor */
const Mouse = () => {
  // const Mouse = ({ children }: Props) => {
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
