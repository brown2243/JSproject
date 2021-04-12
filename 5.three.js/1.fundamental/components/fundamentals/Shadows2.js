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
function Shadows2() {
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
    console.log(data);
    console.log(light);
  }
  useEffect(() => {
    const canvas = ref.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 그림자 맵 옵션 true
    renderer.shadowMap.enabled = true;

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 20); // 카메라의 위치는 중점에서 위로 10칸, 뒤로 20칸 옮깁니다.

    // const controls = new OrbitControls(camera, renderer.domElement);
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const loader = new THREE.TextureLoader();
    {
      const planeSize = 40;
      const texture = loader.load(
        "https://threejsfundamentals.org/threejs/resources/images/checker.png"
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      const repeats = planeSize / 2;
      texture.repeat.set(repeats, repeats);

      const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      //  mesh에 그림자를 드리울지, 그림자의 영향을 받을지 설정해줘야 합니다. mesh.receiveShadow = true;
      mesh.receiveShadow = true;
      mesh.rotation.x = Math.PI * -0.5;
      scene.add(mesh);
    }
    // 정육면체와 구체는 그림자도 드리우고, 영향도 받도록 설정합니다.
    // {
    //   const geometry = new THREE.BoxGeometry(5, 2.5, 5);
    //   const material = new THREE.MeshPhysicalMaterial({ color: "skyblue" });
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.x = -5;
    //   mesh.position.y = 1.2;
    //   mesh.castShadow = true;
    //   mesh.receiveShadow = true;
    //   scene.add(mesh);
    // }
    {
      const cubeSize = 4;
      const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
      scene.add(mesh);
    }
    // {
    //   const geometry = new THREE.SphereGeometry(2, 32, 32);
    //   const material = new THREE.MeshPhysicalMaterial();
    //   const mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.x = 5;
    //   mesh.position.y = 5;
    //   mesh.castShadow = true;
    //   mesh.receiveShadow = true;
    //   scene.add(mesh);
    // }
    {
      const sphereRadius = 3;
      const sphereWidthDivisions = 32;
      const sphereHeightDivisions = 16;
      const sphereGeo = new THREE.SphereGeometry(
        sphereRadius,
        sphereWidthDivisions,
        sphereHeightDivisions
      );
      const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
      scene.add(mesh);
    }

    // light.castShadow 조명도 그림자를 드리우도록 옵션을 활성화
    {
      const color = 0xffffff;
      const light = new THREE.DirectionalLight(color, data.intensity);
      light.castShadow = true;
      light.position.set(data.position_X, data.position_Y, data.position_Z);
      light.target.position.set(data.target_X, data.target_Y, data.target_Z);
      scene.add(light);
      scene.add(light.target);
      setLight(light);
      const helper = new THREE.DirectionalLightHelper(light);
      scene.add(helper);
      const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
      scene.add(cameraHelper);
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    const animate = () => {
      resizeRendererToDisplaySize(renderer);
      {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // camera.updateProjectionMatrix();
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
      <DatGui data={data} onUpdate={onUpdate}>
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
      </DatGui>
    </div>
  );
}
export default React.memo(Shadows2);
