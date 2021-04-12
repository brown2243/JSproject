import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import DatGui, { DatNumber } from "react-dat-gui";
import "../../node_modules/react-dat-gui/dist/index.css";
const OrbitControls = require("three-orbit-controls")(THREE);

const initial = {
  intensity: 1,
  position_X: 0,
  position_Y: 10,
  position_Z: 0,
  target_X: -4,
  target_Y: 0,
  target_Z: -4,
};
function Fogs() {
  const ref = useRef(null);
  const [data, setData] = useState(initial);
  const [light, setLight] = useState();

  function onUpdate(newData) {
    setData({ ...data, ...newData });
    light.intensity = data.intensity;
    light.position.x = data.position_X;
    light.position.y = data.position_Y;
    light.position.z = data.position_Z;
    light.target.position.x = data.target_X;
    light.target.position.y = data.target_Y;
    light.target.position.z = data.target_Z;
  }
  useEffect(() => {
    const canvas = ref.current;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    {
      const near = 1;
      const far = 2;
      const color = "lightblue";
      scene.fog = new THREE.Fog(color, near, far);
      scene.background = new THREE.Color(color);
    }
    // {
    //   const color = "lightblue";
    //   const density = 0.6;
    //   scene.fog = new THREE.FogExp2(color, density);
    // }
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    camera.position.set(0, 0, 2); // 카메라의 위치는 중점에서 위로 10칸, 뒤로 20칸 옮깁니다.

    // const controls = new OrbitControls(camera, renderer.domElement);
    //  controls.target.set(0, 5, 0);
    //  controls.update();

    const obj = [];
    {
      const cubeSize = 1;
      const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMat = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.position.set(-2, cubeSize / 2, 0);
      scene.add(mesh);
      obj.push(mesh);
    }
    {
      const cubeSize = 1;
      const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMat = new THREE.MeshPhongMaterial({ color: 0x8844aa });
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.position.set(0, cubeSize / 2, 0);
      scene.add(mesh);
      obj.push(mesh);
    }
    {
      const cubeSize = 1;
      const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMat = new THREE.MeshPhongMaterial({ color: 0xaa8844 });
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.position.set(2, cubeSize / 2, 0);
      scene.add(mesh);
      obj.push(mesh);
    }

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      // const width = canvas.clientWidth;
      // const height = canvas.clientHeight;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    const animate = () => {
      obj.map((o) => {
        o.rotation.x += 0.005;
        o.rotation.y += 0.005;
      });

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        // camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "100%",
        }}
      >
        <canvas
          ref={ref}
          style={{ width: "100%", height: "100%", display: "block" }}
        ></canvas>
      </div>

      {/* <DatGui data={data} onUpdate={onUpdate}>
        <DatNumber
          path="intensity"
          label="intensity"
          min={0}
          max={2}
          step={0.2}
        />
        <DatNumber
          path="position_X"
          label="position_X"
          min={-15}
          max={15}
          step={1}
        />
        <DatNumber
          path="position_Y"
          label="position_Y"
          min={-15}
          max={15}
          step={1}
        />
        <DatNumber
          path="position_Z"
          label="position_Z"
          min={-15}
          max={15}
          step={1}
        />
        <DatNumber
          path="target_X"
          label="target_X"
          min={-15}
          max={15}
          step={0.3}
        />
        <DatNumber path="target_Y" label="target_Y" min={0} max={15} step={1} />
        <DatNumber
          path="target_Z"
          label="target_Z"
          min={-15}
          max={15}
          step={0.3}
        />
      </DatGui> */}
    </div>
  );
}
export default React.memo(Fogs);
