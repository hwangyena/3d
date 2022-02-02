import { Canvas } from "react-three-fiber";
import Example from "./components/example";
import Video from "./components/video";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      {/* <video autoPlay muted loop className="video">
        <source src="/public/car.mp4" type="video/mp4" />
      </video> */}
      <h1>Hello! This is example.</h1>
      <Canvas orthographic linear>
        {/* <OrbitControls attach="orbitControls" /> */}
        {/* <fog attach="fog" args={["black", 0, 20]} />      */}
        {/* <PerspectiveCamera
          makeDefault
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
        /> */}
        {/* <Video /> */}
        <Example />
      </Canvas>
      <h1>Footer</h1>
    </div>
  );
}

export default App;
