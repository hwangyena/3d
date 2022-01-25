import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import Box from "./components/box";
import Plane from "./components/plane";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      <Canvas>
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        />
        <Stars />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 15]} />
        <Box position={[1, 0, 0]} />
        <Plane position={[1, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
