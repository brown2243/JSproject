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

function Cameras2() {
  const ref = useRef(null);
  const view1 = useRef(null);
  const view2 = useRef(null);

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

    // camera.updateProjectionMatrix();
  };

  useEffect(() => {
    // first
    function cameraGUI() {
      const canvas = ref.current;
      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;

      const camera = new THREE.PerspectiveCamera(
        data.fov,
        // window.clientWidth / window.clientHeight,
        canvas.clientWidth / canvas.clientHeight,
        data.near,
        data.far
      );

      camera.position.set(0, 10, 30); // 카메라의 위치는 중점에서 위로 10칸, 뒤로 20칸 옮깁니다.

      const cameraHelper = new THREE.CameraHelper(camera);
      scene.add(cameraHelper);
      setCamera(camera);

      // 화면 분할
      const view1Elem = view1.current;
      const view2Elem = view2.current;

      // const controls = new OrbitControls(camera, renderer.domElement);
      const controls = new OrbitControls(camera, view1Elem); // 왼쪽에만 반응하도록
      controls.target.set(0, 0, 0);
      controls.update();

      // 두번째 카메라
      const camera2 = new THREE.PerspectiveCamera(
        60, // 시야각(fov)
        2, // 비율(aspect)
        0.1, // near
        500 // far
      );
      camera2.position.set(40, 10, 30);
      camera2.lookAt(0, 5, 0);

      const controls2 = new OrbitControls(camera2, view2Elem);
      controls2.target.set(0, 5, 0);
      controls2.update();

      // 화면 분할 함수
      function setScissorForElement(elem) {
        const canvasRect = canvas.getBoundingClientRect();
        const elemRect = elem.getBoundingClientRect();

        // canvas에 대응하는 사각형을 구하기
        const right =
          Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
        const left = Math.max(0, elemRect.left - canvasRect.left);
        const bottom =
          Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
        const top = Math.max(0, elemRect.top - canvasRect.top);

        const width = Math.min(canvasRect.width, right - left);
        const height = Math.min(canvasRect.height, bottom - top);

        // canvas의 일부분만 렌더링하도록 scissor 적용
        const positiveYUpBottom = canvasRect.height - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);

        // 비율 반환
        return width / height;
      }

      //////////////
      // OBJ
      const objects = [];
      const spread = 15;

      function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;
        scene.add(obj);
        objects.push(obj);
      }

      {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshStandardMaterial({ color: "#8AC" });
        const mesh = new THREE.Mesh(geometry, material);
        addObject(-0.5, 0.5, mesh);
      }

      {
        const geometry = new THREE.SphereGeometry(3, 32, 16);
        const material = new THREE.MeshStandardMaterial({ color: "tomato" });
        const mesh = new THREE.Mesh(geometry, material);
        addObject(0.5, 0.5, mesh);
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

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = (canvas.clientWidth * pixelRatio) | 0;
        const height = (canvas.clientHeight * pixelRatio) | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      const animate = function () {
        resizeRendererToDisplaySize(renderer);
        renderer.setScissorTest(true);
        // 기존 화면 렌더링
        {
          const aspect = setScissorForElement(view1Elem);
          // 비율에 따라 카메라 조정
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
          cameraHelper.update();
          // 기존 화면에서 가이드라인(CameraHelper)이 노출되지 않도록 설정
          cameraHelper.visible = false;
          scene.background = new THREE.Color(0x000000);
          // 렌더링
          renderer.render(scene, camera);
        }
        // 두 번째 카메라 렌더링
        {
          const aspect = setScissorForElement(view2Elem);
          // 비율에 따라 카메라 조정
          camera2.aspect = aspect;
          camera2.updateProjectionMatrix();
          // 가이드라인 활성화
          cameraHelper.visible = true;
          scene.background = new THREE.Color(0x000040);
          renderer.render(scene, camera2);
        }
        objects.map((obj) => {
          obj.rotation.x += 0.005;
          obj.rotation.y += 0.005;
        });
        requestAnimationFrame(animate);
      };
      animate();
    }
    cameraGUI();
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
        <DatGui data={data} onUpdate={handleUpdate} style={{ zIndex: "100" }}>
          <DatNumber path="fov" label="fov" min={1} max={180} step={1} />
          <DatNumber path="near" label="near" min={0.1} max={50} step={0.1} />
          <DatNumber path="far" label="far" min={10} max={100} step={1} />
        </DatGui>
        <canvas
          ref={ref}
          style={{ width: "100%", height: "100%", display: "block" }}
        ></canvas>
        <div
          className="split"
          style={{
            display: "flex",
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            ref={view1}
            style={{ width: "100%", height: "100%" }}
            tabIndex="1"
          ></div>
          <div
            ref={view2}
            style={{ width: "100%", height: "100%" }}
            tabIndex="2"
          ></div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(Cameras2);
