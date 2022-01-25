import { Canvas } from "react-three-fiber";
import Video from "./components/video";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      {/* <video autoPlay muted loop className="video">
        <source src="/public/car.mp4" type="video/mp4" />
      </video> */}
      {/* <Canvas> */}
      <Canvas orthographic linear>
        {/* <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        /> */}

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 15]} />
        <Video />
        {/* <Box position={[1, 0, 0]} />
        <Plane position={[1, 0, 0]} /> */}
      </Canvas>
    </div>
  );
}

export default App;
