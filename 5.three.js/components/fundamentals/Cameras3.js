import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import DatGui, { DatNumber } from "react-dat-gui";
import "../../node_modules/react-dat-gui/dist/index.css";

// three-orbit-controls
// 이렇게 하면 안됌
// import OrbitControls from "three-orbit-controls(THREE)";
// 둘이 똑같은거라 했는데 차이가 있는듯
const OrbitControls = require("three-orbit-controls")(THREE);

const value = {
  fov: 75,
  near: 0.1,
  far: 100,
};
function Shadows() {
  const ref = useRef(null);
  const [data, setData] = useState({
    ...value,
  });
  const [camera, setCamera] = useState();

  const handleUpdate = (newData) => {
    console.log("handleUpdate");
    setData({ ...data, ...newData });
    camera.fov = data.fov;
    camera.near = data.near;
    camera.far = data.far;

    camera.updateProjectionMatrix();
  };
  useEffect(() => {
    // first
    function cameraGUI() {
      const canvas = ref.current;
      const camera = new THREE.PerspectiveCamera(
        data.fov,
        // window.clientWidth / window.clientHeight,
        canvas.clientWidth / canvas.clientHeight,
        data.near,
        data.far
      );
      setCamera(camera);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      const scene = new THREE.Scene();
      camera.position.set(0, 10, 30); // 카메라의 위치는 중점에서 위로 10칸, 뒤로 20칸 옮깁니다.

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      // const handleUpdate = (newData) => {
      //   setData({ ...data, ...newData });
      //   camera.updateProjectionMatrix();
      //   console.log(data.fov);
      // };

      const objects = [];
      const spread = 15;

      function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
      }
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      {
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshStandardMaterial({
          map: loader.load(
            "https://threejsfundamentals.org/threejs/resources/images/wall.jpg"
          ),
        });
        const cube = new THREE.Mesh(geometry, material);
        addObject(-0.5, 0.5, cube);
      }
      {
        const loadManager = new THREE.LoadingManager();
        const loader = new THREE.TextureLoader(loadManager);
        const materials = [
          new THREE.MeshStandardMaterial({
            map: loader.load(
              "https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg"
            ),
          }),
          new THREE.MeshStandardMaterial({
            map: loader.load(
              "https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg"
            ),
          }),
          new THREE.MeshStandardMaterial({
            map: loader.load(
              "https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg"
            ),
          }),
          new THREE.MeshStandardMaterial({
            map: loader.load(
              "https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg"
            ),
          }),
          new THREE.MeshStandardMaterial({
            map: loader.load(
              "https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg"
            ),
          }),
          new THREE.MeshStandardMaterial({
            map: loader.load(
              "https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg"
            ),
          }),
        ];
        const cube = new THREE.Mesh(geometry, materials);
        addObject(0.5, 0.5, cube);
      }
      {
        const planeSize = 40;
        const loader = new THREE.TextureLoader();
        const texture = loader.load(
          "https://threejsfundamentals.org/threejs/resources/images/checker.png"
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);
        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        // const planeMat = new THREE.MeshPhongMaterial({
        //   map: texture,
        //   side: THREE.DoubleSide,
        // });
        //RectAreaLight는 MeshStandardMaterial과 MeshPhysicalMaterial만 지원합니다. 예전 코드에서 재질(material)을 MeshStandardMaterial로 바꾸겠습니다.
        const planeMat = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -0.5;
        scene.add(mesh);
      }
      {
        const color = 0xffffff;
        const intensity = 5;
        const width = 12;
        const height = 10;
        const light = new THREE.RectAreaLight(color, intensity, width, height);
        light.position.set(0, 15, 0);
        light.rotation.x = THREE.MathUtils.degToRad(-90);
        scene.add(light);
      }

      const animate = function () {
        requestAnimationFrame(animate);
        objects.map((obj) => {
          obj.rotation.x += 0.005;
          obj.rotation.y += 0.005;
        });
        renderer.render(scene, camera);
      };
      animate();
    }
    cameraGUI();

    // // 2nd
    // function cameraShow() {
    //   const canvas = ref2.current;
    //   const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    //   renderer.shadowMap.enabled = true;

    //   const scene = new THREE.Scene();

    //   const camera = new THREE.PerspectiveCamera(
    //     75,
    //     canvas.clientWidth / canvas.clientHeight,
    //     // window.innerWidth / window.innerHeight,
    //     0.1,
    //     100
    //   );
    //   camera.position.set(0, 10, 30); // 카메라의 위치는 중점에서 위로 10칸, 뒤로 20칸 옮깁니다.

    //   const controls = new OrbitControls(camera, renderer.domElement);
    //   controls.target.set(0, 0, 0);
    //   controls.update();

    //   const objects = [];
    //   const spread = 15;

    //   function addObject(x, y, obj) {
    //     obj.position.x = x * spread;
    //     obj.position.y = y * spread;

    //     scene.add(obj);
    //     objects.push(obj);
    //   }
    //   {
    //     // box
    //     const geometry = new THREE.BoxGeometry(5, 5, 5);
    //     const material = new THREE.MeshStandardMaterial({ color: "#8AC" });
    //     const mesh = new THREE.Mesh(geometry, material);
    //     addObject(-1, 1, mesh);
    //   }
    //   {
    //     const geometry = new THREE.MeshPhongMaterial({ color: "#CA8" });
    //     const material = new THREE.SphereGeometry(3, 32, 16);
    //     const mesh = new THREE.Mesh(geometry, material);
    //     addObject(1, 1, mesh);
    //   }

    //   {
    //     const planeSize = 40;
    //     const loader = new THREE.TextureLoader();
    //     const texture = loader.load(
    //       "https://threejsfundamentals.org/threejs/resources/images/checker.png"
    //     );
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.magFilter = THREE.NearestFilter;
    //     const repeats = planeSize / 2;
    //     texture.repeat.set(repeats, repeats);
    //     const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    //     const planeMat = new THREE.MeshStandardMaterial({
    //       map: texture,
    //       side: THREE.DoubleSide,
    //     });
    //     const mesh = new THREE.Mesh(planeGeo, planeMat);
    //     mesh.rotation.x = Math.PI * -0.5;
    //     scene.add(mesh);
    //   }
    //   {
    //     const color = 0xffffff;
    //     const intensity = 5;
    //     const width = 12;
    //     const height = 10;
    //     const light = new THREE.RectAreaLight(color, intensity, width, height);
    //     light.position.set(0, 15, 0);
    //     light.rotation.x = THREE.MathUtils.degToRad(-90);
    //     scene.add(light);
    //   }

    //   const animate = function () {
    //     requestAnimationFrame(animate);
    //     objects.map((obj) => {
    //       obj.rotation.x += 0.005;
    //       obj.rotation.y += 0.005;
    //     });
    //     renderer.render(scene, camera);
    //   };
    //   animate();
    // }
    // cameraShow();
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
        <DatGui data={data} onUpdate={handleUpdate}>
          <DatNumber path="fov" label="fov" min={1} max={180} step={1} />
          <DatNumber path="near" label="near" min={0.1} max={50} step={0.1} />
          <DatNumber path="far" label="far" min={10} max={100} step={1} />
        </DatGui>
        <canvas
          ref={ref}
          style={{ width: "100%", height: "100%", display: "block" }}
        ></canvas>
      </div>
    </div>
  );
}
export default React.memo(Shadows);
