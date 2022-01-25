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
        <Video />
      </Canvas>
    </div>
  );
}

export default App;
