import { Canvas } from "react-three-fiber";
import Effect from "./components/effect";

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
        <Effect />
        {/* <fog attach="fog" args={["black", 0, 20]} />      */}
        <Video />
      </Canvas>
      <h1>Footer</h1>
    </div>
  );
}

export default App;
