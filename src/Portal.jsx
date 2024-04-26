import { useRef } from "react";
import {
  shaderMaterial,
  Sparkles,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

const { portalColorStart, portalColorEnd } = {
  portalColorStart: "#00b3ff",
  portalColorEnd: "#710986",
};

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color(portalColorStart),
    uColorEnd: new THREE.Color(portalColorEnd),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Portal() {
  const { nodes } = useGLTF("./portal.glb");
  const bakedTexture = useTexture("./baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef();
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  const { background } = useControls("background", {
    background: "#030202",
  });

  const { uColorStart, uColorEnd } = useControls("portalColor", {
    uColorStart: portalColorStart,
    uColorEnd: portalColorEnd,
  });

  const { firefliesColor } = useControls("firefliesColor", {
    firefliesColor: "#ffffff",
  });

  return (
    <>
      <color args={[background]} attach={"background"} />
      <OrbitControls maxPolarAngle={Math.PI / 2}/>

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
        >
          <portalMaterial
            ref={portalMaterial}
            uColorStart={uColorStart}
            uColorEnd={uColorEnd}
            side={THREE.DoubleSide}
          />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 6]}
          position-y={1}
          speed={0.5}
          count={40}
          color={firefliesColor}
        />
      </Center>
    </>
  );
}
