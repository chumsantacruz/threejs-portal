import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import Portal from "./Portal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas
      flat
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
    >
      <Portal />
    </Canvas>
  </React.StrictMode>
);
