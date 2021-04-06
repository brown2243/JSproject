import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { BufferGeometryUtils } from "../module/BufferGeometryUtils";
const OrbitControls = require("three-orbit-controls")(THREE);

function Picking() {
  const ref = useRef(null);

  useEffect(() => {
    function main() {
      const canvas = ref.current;
      const renderer = new THREE.WebGLRenderer({ canvas });

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("white");

      const pickingScene = new THREE.Scene();
      pickingScene.background = new THREE.Color(0);

      const fov = 60;
      const aspect = 2; // 캔버스 기본값
      const near = 0.1;
      const far = 200;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 30;

      const cameraPole = new THREE.Object3D();
      scene.add(cameraPole);
      cameraPole.add(camera);

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        camera.add(light);
      }

      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      function rand(min, max) {
        if (max === undefined) {
          max = min;
          min = 0;
        }
        return min + (max - min) * Math.random();
      }

      function randomColor() {
        return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
      }
      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        "https://threejsfundamentals.org/threejs/resources/images/frame.png"
      );

      const idToObject = {};
      const numObjects = 100;
      for (let i = 0; i < numObjects; ++i) {
        const id = i + 1;
        const material = new THREE.MeshPhongMaterial({
          color: randomColor(),
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          alphaTest: 0.1,
        });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        idToObject[id] = cube;

        cube.position.set(rand(-20, 20), rand(-20, 20), rand(-20, 20));
        cube.rotation.set(rand(Math.PI), rand(Math.PI), 0);
        cube.scale.set(rand(3, 6), rand(3, 6), rand(3, 6));

        const pickingMaterial = new THREE.MeshPhongMaterial({
          emissive: new THREE.Color(id),
          color: new THREE.Color(0, 0, 0),
          specular: new THREE.Color(0, 0, 0),
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
          alphaTest: 0.5,
          blending: THREE.NoBlending,
        });

        const pickingCube = new THREE.Mesh(geometry, pickingMaterial);
        pickingScene.add(pickingCube);
        pickingCube.position.copy(cube.position);
        pickingCube.rotation.copy(cube.rotation);
        pickingCube.scale.copy(cube.scale);
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

      class GPUPickHelper {
        constructor() {
          this.pickingTexture = new THREE.WebGLRenderTarget(1, 1);
          this.pixelBuffer = new Uint8Array(4);
          this.pickedObject = null;
          this.pickedObjectSavedColor = 0;
        }
        pick(cssPosition, scene, camera, time) {
          const { pickingTexture, pixelBuffer } = this;

          // 기존에 선택된 요소가 있는 경우 색을 복원합니다
          if (this.pickedObject) {
            this.pickedObject.material.emissive.setHex(
              this.pickedObjectSavedColor
            );
            this.pickedObject = undefined;
          }

          // view offset을 마우스 포인터 아래 1픽셀로 설정합니다
          const pixelRatio = renderer.getPixelRatio();
          camera.setViewOffset(
            renderer.getContext().drawingBufferWidth, // 전체 너비
            renderer.getContext().drawingBufferHeight, // 전체 높이
            (cssPosition.x * pixelRatio) | 0, // 사각 x 좌표
            (cssPosition.y * pixelRatio) | 0, // 사각 y 좌표
            1, // 사각 좌표 width
            1 // 사각 좌표 height
          );
          // 장면을 렌더링합니다
          renderer.setRenderTarget(pickingTexture);
          renderer.render(scene, camera);
          renderer.setRenderTarget(null);

          // view offset을 정상으로 돌려 원래의 화면을 렌더링하도록 합니다
          camera.clearViewOffset();
          // 픽셀을 감지합니다
          renderer.readRenderTargetPixels(
            pickingTexture,
            0, // x
            0, // y
            1, // width
            1, // height
            pixelBuffer
          );

          const id =
            (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | pixelBuffer[2];
          const intersectedObject = idToObject[id];
          if (intersectedObject) {
            // 첫 번째 물체가 제일 가까우므로 해당 물체를 고릅니다
            this.pickedObject = intersectedObject;
            // 기존 색을 저장해둡니다
            this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
            // emissive 색을 빨강/노랑으로 빛나게 만듭니다
            this.pickedObject.material.emissive.setHex(
              (time * 8) % 2 > 1 ? 0xffff00 : 0xff0000
            );
          }
        }
      }
      const pickPosition = { x: 0, y: 0 };
      const pickHelper = new GPUPickHelper();
      clearPickPosition();

      function render(time) {
        time *= 0.001; // convert to seconds;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        cameraPole.rotation.y = time * 0.1;

        pickHelper.pick(pickPosition, pickingScene, camera, time);
        renderer.render(scene, camera);

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);

      function getCanvasRelativePosition(event) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: ((event.clientX - rect.left) * canvas.width) / rect.width,
          y: ((event.clientY - rect.top) * canvas.height) / rect.height,
        };
      }

      function setPickPosition(event) {
        const pos = getCanvasRelativePosition(event);
        pickPosition.x = pos.x;
        pickPosition.y = pos.y;
      }

      function clearPickPosition() {
        // unlike the mouse which always has a position
        // if the user stops touching the screen we want
        // to stop picking. For now we just pick a value
        // unlikely to pick something
        pickPosition.x = -100000;
        pickPosition.y = -100000;
      }
      window.addEventListener("mousemove", setPickPosition);
      window.addEventListener("mouseout", clearPickPosition);
      window.addEventListener("mouseleave", clearPickPosition);

      window.addEventListener(
        "touchstart",
        (event) => {
          // prevent the window from scrolling
          event.preventDefault();
          setPickPosition(event.touches[0]);
        },
        { passive: false }
      );

      window.addEventListener("touchmove", (event) => {
        setPickPosition(event.touches[0]);
      });

      window.addEventListener("touchend", clearPickPosition);
    }

    main();
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
      <canvas
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      ></canvas>
    </div>
  );
}

export default Picking;
