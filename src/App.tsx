import { Effects, OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "react-three-fiber";
import Lights from "./components/lights";
import Mouse from "./components/mouse";
import Video from "./components/video";
import "./styles/global.css";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

extend({ EffectComposer, GlitchPass });

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
    </div>
  );
}

export default App;
