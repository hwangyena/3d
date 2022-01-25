import { useState } from "react";
import { Canvas } from "react-three-fiber";
import Box from "./components/box";

function App() {
  return (
    <div className="App">
      This is example~
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
      >
        foggg
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[1, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
