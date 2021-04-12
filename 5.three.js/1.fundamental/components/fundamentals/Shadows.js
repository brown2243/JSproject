import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import "../../node_modules/react-dat-gui/dist/index.css";
const OrbitControls = require("three-orbit-controls")(THREE);

//  OrthographicCamera(정사영 카메라)
// 절두체 대신 left, right, top, bottom, near, far로 육면체를 정의해 사용하죠.
// 육면체로 화면을 투사하기에 원근 효과가 없습니다.
// Three.js에서 OrthographicCamera는 주로 2D 요소를 표현하기 위해 사용합니다.
// 카메라에 얼마나 많은 요소를 보여줄지만 결정하면 되죠.
// 만약 canvas의 1픽셀을 카메라의 한 칸과 같은 크기로 지정하고 싶다면
// 중점을 장면의 중심에 두고 1 픽셀을 Three.js의 한 칸으로 만들 수 있습니다.
function Shadows() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;

    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 20); // 카메라의 위치는 중점에서 위로 10칸, 뒤로 20칸 옮깁니다.

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
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
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      planeMat.color.setRGB(1.5, 1.5, 1.5);
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -0.5;
      scene.add(mesh);
    }

    const shadowTexture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/roundshadow.png"
    );
    const sphereShadowBases = [];
    const sphereRadius = 1;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const planeSize = 1;
    const shadowGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const numSpheres = 15;
    for (let i = 0; i < numSpheres; ++i) {
      // 구체와 그림자가 같이 움직이도록 컨테이너(base)를 만듭니다
      const base = new THREE.Object3D();
      scene.add(base);

      /**
       * 그림자를 컨테이너에 추가합니다
       * 주의: 여기서는 각 구체의 투명도를 따로 설정할 수 있도록
       * 재질을 각각 따로 만듬
       */
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true, // 땅이 보이도록
        depthWrite: false, // 그림자를 따로 정렬하지 않도록
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.y = 0.001; // 그림자를 땅에서 살짝 위에 배치
      shadowMesh.rotation.x = Math.PI * -0.5;
      const shadowSize = sphereRadius * 4;
      shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
      base.add(shadowMesh);

      // 구체를 컨테이너에 추가
      const u = i / numSpheres; // 반복문이 진행됨에 따라 0에서 1사이 값을 지정
      const sphereMat = new THREE.MeshPhongMaterial();
      sphereMat.color.setHSL(u, 1, 0.75);
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.position.set(0, sphereRadius + 2, 0);
      base.add(sphereMesh);

      // y축 좌표를 포함해 나머지 요소를 기록
      sphereShadowBases.push({
        base,
        sphereMesh,
        shadowMesh,
        y: sphereMesh.position.y,
      });
    }

    {
      const skyColor = 0xb1e1ff; // 하늘색
      const groundColor = 0xb97a20; // 오렌지 브라운
      const intensity = 0.5;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }
    {
      const color = 0xffffff;
      const intensity = 0.5;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 5);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
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

    const a = () => {};
    const animate = (time) => {
      time *= 0.001; // 초 단위로 변환
      sphereShadowBases.forEach((sphereShadowBase, ndx) => {
        const { base, sphereMesh, shadowMesh, y } = sphereShadowBase;

        // u는 구체의 반복문을 실행하면서 인덱스에 따라 0 이상, 1 이하로 지정됩니다
        const u = ndx / sphereShadowBases.length;

        /**
         * 컨테이너의 위치를 계산합니다. 구체와 그림자가
         * 컨테이너에 종속적이므로 위치가 같이 변합니다
         */
        const speed = time * 0.2;
        const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : -1);
        const radius = Math.sin(speed - ndx) * 10;
        base.position.set(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius
        );

        // yOff 값은 0 이상 1 이하입니다
        const yOff = Math.abs(Math.sin(time * 2 + ndx));
        // 구체를 위아래로 튕김
        sphereMesh.position.y = y + THREE.MathUtils.lerp(-2, 2, yOff);
        // 구체가 위로 올라갈수록 그림자가 옅어짐
        shadowMesh.material.opacity = THREE.MathUtils.lerp(1, 0.25, yOff);
      });
      resizeRendererToDisplaySize(renderer);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(1000);
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
    </div>
  );
}
export default React.memo(Shadows);
