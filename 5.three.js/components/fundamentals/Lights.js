import React, { useEffect, useRef } from "react";
import * as THREE from "three";
// three-orbit-controls
// 이렇게 하면 안됌
// import OrbitControls from "three-orbit-controls(THREE)";
// 둘이 똑같은거라 했는데 차이가 있는듯
const OrbitControls = require("three-orbit-controls")(THREE);

function Lights() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      // window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 10, 30); // 카메라의 위치는 중점에서 위로 10칸, 뒤로 20칸 옮깁니다.

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

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
    // // Lights
    // // AmbientLight(자연광) new THREE.AmbientLight(color, intensity);

    // {
    //   const color = 0xffffff;
    //   const intensity = 1;
    //   const light = new THREE.AmbientLight(color, intensity);
    //   scene.add(light);
    // }

    // // 물체들이 평평하고, 윤곽이 뚜렷하지 않습니다. AmbientLight는 물체와 조명의 색, 그리고 조명의 밝기를 곱한 것과 같죠.
    // // HemisphereLight(반구광)
    // // HemisphereLight는 천장과 바닥의 색을 인자로 받아, 물체의 천장을 바라보는 면은 천장 색, 바닥을 바라보는 면은 바닥 색으로 혼합합니다.
    // // 이 또한 그다지 입체적이지 않습니다. 아까보다는 낮지만 전체적으로 2D처럼 보이네요. HemisphereLight는 주로 풍경을 표현하거나 할 때 다른 조명과 함께 사용합니다. 다른 조명과 조합할 때 유용하고, 간단히는 AmbientLight 대신 사용할 수 있죠.
    // {
    //   const skyColor = 0xb1e1ff; // 하늘색
    //   const groundColor = 0xb97a20;
    //   const intensity = 1;
    //   const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    //   scene.add(light);
    // }

    // // DirectionalLight(직사광)
    // // 주로 태양을 표현할 때 사용합니다.
    // // 먼저 light와 light.target(목표)을 모두 장면에 추가해야 합니다.
    // // 그래야 Three.js의 DirectionalLight가 목표가 있는 방향으로 빛을 쬘 테니까요.
    // {
    //   const color = 0xffffff;
    //   const intensity = 1;
    //   const light = new THREE.DirectionalLight(color, intensity);
    //   light.position.set(0, 10, 0);
    //   light.target.position.set(-5, 0, 0);
    //   scene.add(light);
    //   scene.add(light.target);
    //   const helper = new THREE.DirectionalLightHelper(light);
    //   scene.add(helper);
    // }

    // // PointLight는 한 점에서 무한히 뻗어나가는 광원입니다.
    // {
    //   const color = 0xffffff;
    //   const intensity = 1;
    //   const light = new THREE.PointLight(color, intensity);
    //   light.position.set(0, 10, 0);
    //   scene.add(light);
    //   const helper = new THREE.PointLightHelper(light);
    //   scene.add(helper);
    // }

    // // SpotLight
    // // 스포트라이트는 비유하자면 원뿔 안의 PointLight입니다. 차이점은 원뿔 안에서만 빛난다는 점이죠.
    // // SpotLight의 원뿔은 종류는 외부 원뿔과 내부 원뿔 두 가지입니다.
    // // 빛의 밝기는 내부 원뿔에서 가장 세고, 외부 원뿔에 가까워질수록 0까지 낮아집니다.
    // {
    //   const color = 0xffffff;
    //   const intensity = 1;
    //   const light = new THREE.SpotLight(color, intensity);
    //   light.position.set(0, 10, 0);
    //   scene.add(light);
    //   scene.add(light.target);

    //   const helper = new THREE.SpotLightHelper(light);
    //   scene.add(helper);
    // }

    // // RectAreaLight
    // // 마지막으로 살펴볼 조명은 RectAreaLight입니다.
    // // 사각 형태의 조명으로, 형광등이나 천장의 유리를 통과하는 태양빛을 표현하기에 적합합니다.
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

    // // WebGLRenderer의 physicallyCorrectLights(물리 기반 조명) 설정이 있습니다.
    // // 이는 거리에 따라 빛이 어떻게 떨어질지 결정하는 속성으로, PointLight와 SpotLight가 이 설정의 영향을 받습니다.
    // // RectAreaLight는 마찬가지로 설정의 영향도 받고, 기본적으로 이 설정을 사용하죠.
    // // 이 설정을 사용하면 기본적으로 조명의 distance나 intensity 대신 power 속성을 루멘(lumens) 단위로 설정해야 합니다.
    // // 그러면 Three.js는 물리적 계산을 통해 실제 광원을 흉내내죠.
    // // 예제의 거리 단위는 미터(meters)이니, 60w짜리 전구는 약 800루멘 정도일 겁니다.
    // // 그리고 조명의 부서짐(decay) 정도를 설정하는 decay 속성도 있습니다.
    // // 현실적인 조명을 위해서는 2 정도가 적당하죠.
    // {
    //   renderer.physicallyCorrectLights = true;
    //   const color = 0xffffff;
    //   const intensity = 1;
    //   const light = new THREE.PointLight(color, intensity);
    //   light.power = 2000;
    //   light.decay = 1;
    //   light.distance = Infinity;
    //   scene.add(light);
    // }

    const animate = function () {
      requestAnimationFrame(animate);
      objects.map((obj) => {
        obj.rotation.x += 0.005;
        obj.rotation.y += 0.005;
      });

      renderer.render(scene, camera);
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
      <canvas
        ref={ref}
        style={{ width: "100%", height: "100%", display: "block" }}
      ></canvas>
    </div>
  );
}

export default Lights;
