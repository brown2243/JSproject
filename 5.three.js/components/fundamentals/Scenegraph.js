import React, { useEffect, useRef } from "react";
import * as THREE from "three";
// import DatGui, {
//   DatNumber,
//   DatSelect,
//   DatButton,
//   DatBoolean,
// } from "react-dat-gui";

// import * as dat from "react-dat-gui";
// const dat = require("dat.gui");
// import dynamic from "next/dynamic";
// const dat = dynamic(() => import("dat.gui"), {
//   ssr: false,
// });

// import * as dat from "dat.gui";

// https://threejsfundamentals.org/threejs/lessons/kr/threejs-scenegraph.html
function Scenegraph() {
  const ref = useRef(null);
  const refTank = useRef(null);

  useEffect(() => {
    function solorSys() {
      const canvas = ref.current;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      const fov = 75;
      const aspect = window.innerWidth / window.innerHeight; // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

      camera.position.set(0, 20, 0);
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 0);

      const scene = new THREE.Scene();

      // 회전값을 업데이트할 객체들
      const objects = [];

      // 하나의 geometry로 모든 태양, 지구, 달을 생성
      const radius = 1;
      const widthSegments = 6;
      const heightSegments = 6;
      const sphereGeometry = new THREE.SphereGeometry(
        radius,
        widthSegments,
        heightSegments
      );
      // 항성계
      const solarSystem = new THREE.Object3D();
      scene.add(solarSystem);
      objects.push(solarSystem);

      // 태양
      const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
      const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
      sunMesh.scale.set(5, 5, 5); // 태양의 크기를 키움
      solarSystem.add(sunMesh);
      objects.push(sunMesh);
      //  지구 궤도
      const earthOrbit = new THREE.Object3D();
      earthOrbit.position.x = 10;
      solarSystem.add(earthOrbit);
      objects.push(earthOrbit);

      // 지구
      const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2233ff,
        emissive: 0x112244,
      });
      const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
      earthOrbit.add(earthMesh);
      objects.push(earthMesh);
      //  달 궤도
      const moonOrbit = new THREE.Object3D();
      moonOrbit.position.x = 2;
      earthOrbit.add(moonOrbit);
      //  달
      const moonMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        emissive: 0x222222,
      });
      const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
      moonMesh.scale.set(0.5, 0.5, 0.5);
      moonOrbit.add(moonMesh);
      objects.push(moonMesh);

      // AxesHelper로, 이 클래스는 지역 X, Y, Z 축을 표시해줍니다.
      // x축(빨강), z축(파랑) 각 물체도 y축을 따라 회전하므로 y축(초록)
      objects.forEach((node) => {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 1;
        node.add(axes);
      });

      // // 또 Three.js와 함께 사용하기로 유명한 dat.GUI도 사용할 겁니다.
      // // dat.GUI는 UI 라이브러리로, 객체와 속성 이름을 넘겨받고,
      // // 해당 속성의 타입을 기반으로 속성값을 UI로 조정할 수 있게 해줍니다.

      // class AxisGridHelper {
      //   constructor(node, units = 10) {
      //     const axes = new THREE.AxesHelper();
      //     axes.material.depthTest = false;
      //     axes.renderOrder = 2; // 격자 다음에 렌더링
      //     node.add(axes);

      //     const grid = new THREE.GridHelper(units, units);
      //     grid.material.depthTest = false;
      //     grid.renderOrder = 1;
      //     node.add(grid);

      //     this.grid = grid;
      //     this.axes = axes;
      //     this.visible = false;
      //   }
      //   get visible() {
      //     return this._visible;
      //   }
      //   set visible(v) {
      //     this._visible = v;
      //     this.grid.visible = v;
      //     this.axes.visible = v;
      //   }
      // }

      // function makeAxisGrid(node, label, units) {
      //   const helper = new AxisGridHelper(node, units);
      //   gui.add(helper, "visible").name(label);
      // }

      // makeAxisGrid(solarSystem, "solarSystem", 25);
      // makeAxisGrid(sunMesh, "sunMesh");
      // makeAxisGrid(earthOrbit, "earthOrbit");
      // makeAxisGrid(earthMesh, "earthMesh");
      // makeAxisGrid(moonMesh, "moonMesh");

      {
        const color = 0xffffff;
        const intensity = 3;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);
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
        requestAnimationFrame(animate);

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        objects.forEach((obj) => {
          obj.rotation.y += 0.01;
        });

        renderer.render(scene, camera);
      };
      animate();
    }
    solorSys();

    function Tank() {
      const canvas = refTank.current;
      const renderer = new THREE.WebGLRenderer({ canvas: canvas });
      renderer.setClearColor(0xaaaaaa);
      renderer.shadowMap.enabled = true;

      function makeCamera(fov = 40) {
        const aspect = 2; // the canvas default
        const zNear = 0.1;
        const zFar = 1000;
        return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
      }
      const camera = makeCamera();
      camera.position.set(8, 4, 10).multiplyScalar(3);
      camera.lookAt(0, 0, 0);

      const scene = new THREE.Scene();

      {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 20, 0);
        scene.add(light);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;

        const d = 50;
        light.shadow.camera.left = -d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = -d;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 50;
        light.shadow.bias = 0.001;
      }

      {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 2, 4);
        scene.add(light);
      }

      const groundGeometry = new THREE.PlaneGeometry(50, 50);
      const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xcc8866 });
      const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      groundMesh.rotation.x = Math.PI * -0.5;
      groundMesh.receiveShadow = true;
      scene.add(groundMesh);

      const carWidth = 4;
      const carHeight = 1;
      const carLength = 8;

      const tank = new THREE.Object3D();
      scene.add(tank);

      const bodyGeometry = new THREE.BoxGeometry(
        carWidth,
        carHeight,
        carLength
      );
      const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x6688aa });
      const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bodyMesh.position.y = 1.4;
      bodyMesh.castShadow = true;
      tank.add(bodyMesh);

      const tankCameraFov = 75;
      const tankCamera = makeCamera(tankCameraFov);
      tankCamera.position.y = 3;
      tankCamera.position.z = -6;
      tankCamera.rotation.y = Math.PI;
      bodyMesh.add(tankCamera);

      const wheelRadius = 1;
      const wheelThickness = 0.5;
      const wheelSegments = 12;
      const wheelGeometry = new THREE.CylinderGeometry(
        wheelRadius, // top radius
        wheelRadius, // bottom radius
        wheelThickness, // height of cylinder
        wheelSegments
      );
      const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
      const wheelPositions = [
        [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, carLength / 3],
        [carWidth / 2 + wheelThickness / 2, -carHeight / 2, carLength / 3],
        [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0],
        [carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0],
        [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3],
        [carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3],
      ];
      const wheelMeshes = wheelPositions.map((position) => {
        const mesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        mesh.position.set(...position);
        mesh.rotation.z = Math.PI * 0.5;
        mesh.castShadow = true;
        bodyMesh.add(mesh);
        return mesh;
      });

      const domeRadius = 2;
      const domeWidthSubdivisions = 12;
      const domeHeightSubdivisions = 12;
      const domePhiStart = 0;
      const domePhiEnd = Math.PI * 2;
      const domeThetaStart = 0;
      const domeThetaEnd = Math.PI * 0.5;
      const domeGeometry = new THREE.SphereGeometry(
        domeRadius,
        domeWidthSubdivisions,
        domeHeightSubdivisions,
        domePhiStart,
        domePhiEnd,
        domeThetaStart,
        domeThetaEnd
      );
      const domeMesh = new THREE.Mesh(domeGeometry, bodyMaterial);
      domeMesh.castShadow = true;
      bodyMesh.add(domeMesh);
      domeMesh.position.y = 0.5;

      const turretWidth = 0.1;
      const turretHeight = 0.1;
      const turretLength = carLength * 0.75 * 0.2;
      const turretGeometry = new THREE.BoxGeometry(
        turretWidth,
        turretHeight,
        turretLength
      );
      const turretMesh = new THREE.Mesh(turretGeometry, bodyMaterial);
      const turretPivot = new THREE.Object3D();
      turretMesh.castShadow = true;
      turretPivot.scale.set(5, 5, 5);
      turretPivot.position.y = 0.5;
      turretMesh.position.z = turretLength * 0.5;
      turretPivot.add(turretMesh);
      bodyMesh.add(turretPivot);

      const turretCamera = makeCamera();
      turretCamera.position.y = 0.75 * 0.2;
      turretMesh.add(turretCamera);

      const targetGeometry = new THREE.SphereGeometry(0.5, 6, 3);
      const targetMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: true,
      });
      const targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
      const targetOrbit = new THREE.Object3D();
      const targetElevation = new THREE.Object3D();
      const targetBob = new THREE.Object3D();
      targetMesh.castShadow = true;
      scene.add(targetOrbit);
      targetOrbit.add(targetElevation);
      targetElevation.position.z = carLength * 2;
      targetElevation.position.y = 8;
      targetElevation.add(targetBob);
      targetBob.add(targetMesh);

      const targetCamera = makeCamera();
      const targetCameraPivot = new THREE.Object3D();
      targetCamera.position.y = 1;
      targetCamera.position.z = -2;
      targetCamera.rotation.y = Math.PI;
      targetBob.add(targetCameraPivot);
      targetCameraPivot.add(targetCamera);

      // Create a sine-like wave
      const curve = new THREE.SplineCurve([
        new THREE.Vector2(-10, 0),
        new THREE.Vector2(-5, 5),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(5, -5),
        new THREE.Vector2(10, 0),
        new THREE.Vector2(5, 10),
        new THREE.Vector2(-5, 10),
        new THREE.Vector2(-10, -10),
        new THREE.Vector2(-15, -8),
        new THREE.Vector2(-15, -8),
        new THREE.Vector2(-10, 0),
      ]);

      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const splineObject = new THREE.Line(geometry, material);
      splineObject.rotation.x = Math.PI * 0.5;
      splineObject.position.y = 0.05;
      scene.add(splineObject);

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

      const targetPosition = new THREE.Vector3();
      const tankPosition = new THREE.Vector2();
      const tankTarget = new THREE.Vector2();

      const cameras = [
        { cam: camera, desc: "detached camera" },
        { cam: turretCamera, desc: "on turret looking at target" },
        { cam: targetCamera, desc: "near target looking at tank" },
        { cam: tankCamera, desc: "above back of tank" },
      ];

      const infoElem = document.querySelector("#info");

      function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          cameras.forEach((cameraInfo) => {
            const camera = cameraInfo.cam;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          });
        }

        // move target
        targetOrbit.rotation.y = time * 0.27;
        targetBob.position.y = Math.sin(time * 2) * 4;
        targetMesh.rotation.x = time * 7;
        targetMesh.rotation.y = time * 13;
        targetMaterial.emissive.setHSL((time * 10) % 1, 1, 0.25);
        targetMaterial.color.setHSL((time * 10) % 1, 1, 0.25);

        // move tank
        const tankTime = time * 0.05;
        curve.getPointAt(tankTime % 1, tankPosition);
        curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
        tank.position.set(tankPosition.x, 0, tankPosition.y);
        tank.lookAt(tankTarget.x, 0, tankTarget.y);

        // face turret at target
        targetMesh.getWorldPosition(targetPosition);
        turretPivot.lookAt(targetPosition);

        // make the turretCamera look at target
        turretCamera.lookAt(targetPosition);

        // make the targetCameraPivot look at the at the tank
        tank.getWorldPosition(targetPosition);
        targetCameraPivot.lookAt(targetPosition);

        wheelMeshes.forEach((obj) => {
          obj.rotation.x = time * 3;
        });

        const camera = cameras[(time * 0.25) % cameras.length | 0];
        infoElem.textContent = camera.desc;

        renderer.render(scene, camera.cam);

        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    }
    Tank();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "200vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <canvas
        ref={ref}
        style={{ width: "100%", height: "50%", display: "block" }}
      ></canvas>
      <canvas
        ref={refTank}
        style={{ width: "100%", height: "50%", display: "block" }}
      ></canvas>
      <div
        id="info"
        style={{
          position: "absolute",
          left: "1em",
          top: "105vh",
          background: "rgba(0,0,0,.8)",
          padding: ".5em",
          color: "white",
          fontFamily: "monospace",
        }}
      ></div>
    </div>
  );
}

export default Scenegraph;
