import { Canvas } from "react-three-fiber";
import Video from "./components/video";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      {/* <video autoPlay muted loop className="video">
        <source src="/public/car.mp4" type="video/mp4" />
      </video> */}
      <Canvas orthographic linear>
        {/* <Effects>
          <glitchPass />
        </Effects> */}
        {/* <fog attach="fog" args={["black", 0, 20]} />      */}
        <Video />
      </Canvas>
      <h1>Hello!</h1>
    </div>
  );
}

export default App;
