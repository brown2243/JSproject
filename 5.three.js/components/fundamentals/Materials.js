import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// https://threejsfundamentals.org/threejs/lessons/kr/threejs-materials.html

//

function Materials() {
  const ref = useRef(null);

  useEffect(() => {
    function material() {
      // const material = new THREE.MeshPhongMaterial({
      //   color: 0xff0000, // 빨강 (CSS처럼 문자열로 넘겨줄 수도 있음. "#ff0000")
      //   flatShading: true,
      // });

      // material.color.set(0x00FFFF);    // CSS의 #RRGGBB 형식
      // material.color.set(cssString);   /* CSS 색상 문자열, 예를 들어 'purple', '#F32',
      //                                   * 'rgb(255, 127, 64)',
      //                                   * 'hsl(180, 50%, 25%)' 등
      //                                   */
      // material.color.set(someColor)    // THREE.Color에 정의된 static 색상
      // material.color.setHSL(h, s, l)   // hsl 색상, 0부터 1까지
      // material.color.setRGB(r, g, b)   // rgb 색상, 0부터 1까지

      // const m1 = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 빨강
      // const m2 = new THREE.MeshBasicMaterial({ color: "red" }); // 빨강
      // const m3 = new THREE.MeshBasicMaterial({ color: "#F00" }); // 빨강
      // const m4 = new THREE.MeshBasicMaterial({ color: "rgb(255,0,0)" }); // 빨강
      // const m5 = new THREE.MeshBasicMaterial({ color: "hsl(0,100%,50%)" }); // 빨강

      const canvas = ref.current;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      const fov = 40;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 180;

      const scene = new THREE.Scene();
      // scene.background = new THREE.Color(0xaaaaaa);

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }
      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(1, -2, -4);
        scene.add(light);
      }

      const objects = [];
      const spread = 15;

      function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
      }
      const geometry = new THREE.SphereGeometry(7, 12, 12);
      const basic = new THREE.MeshBasicMaterial({ color: "tomato" });
      const basicmesh = new THREE.Mesh(geometry, basic);

      const Lambert = new THREE.MeshLambertMaterial({ color: "tomato" });
      const Lambertmesh = new THREE.Mesh(geometry, Lambert);

      const Phong = new THREE.MeshPhongMaterial({ color: "tomato" });
      const Phongmesh = new THREE.Mesh(geometry, Phong);

      const Toon = new THREE.MeshToonMaterial({ color: "tomato" });
      const Toonmesh = new THREE.Mesh(geometry, Toon);

      addObject(-1.5, 3, basicmesh);
      addObject(-0.5, 3, Lambertmesh);
      addObject(0.5, 3, Phongmesh);
      addObject(1.5, 3, Toonmesh);

      function makeM(x, y, roughness, metalness) {
        const material = new THREE.MeshStandardMaterial({
          roughness: roughness,
          metalness: metalness,
        });
        const mesh = new THREE.Mesh(geometry, material);
        addObject(x, y, mesh);
      }
      let x = 2,
        y = 0;
      while (y <= 1) {
        makeM(-2.5, x, 0, y);
        makeM(-1.5, x, 0.2, y);
        makeM(-0.5, x, 0.4, y);
        makeM(0.5, x, 0.6, y);
        makeM(1.5, x, 0.8, y);
        makeM(2.5, x, 1, y);
        x -= 1;
        y += 0.2;
      }
      // makeM(-2.5, 2, 0, 0);
      // makeM(-1.5, 2, 0.2, 0);
      // makeM(-0.5, 2, 0.4, 0);
      // makeM(0.5, 2, 0.6, 0);
      // makeM(1.5, 2, 0.8, 0);
      // makeM(2.5, 2, 1, 0);

      // makeM(-2.5, 1, 0, 0.2);
      // makeM(-1.5, 1, 0.2, 0.2);
      // makeM(-0.5, 1, 0.4, 0.2);
      // makeM(0.5, 1, 0.6, 0.2);
      // makeM(1.5, 1, 0.8, 0.2);
      // makeM(2.5, 1, 1, 0.2);

      // makeM(-2.5, 0, 0, 0.4);
      // makeM(-1.5, 0, 0.2, 0.4);
      // makeM(-0.5, 0, 0.4, 0.4);
      // makeM(0.5, 0, 0.6, 0.4);
      // makeM(1.5, 0, 0.8, 0.4);
      // makeM(2.5, 0, 1, 0.4);

      // makeM(-2.5, -1, 0, 0.6);
      // makeM(-1.5, -1, 0.2, 0.6);
      // makeM(-0.5, -1, 0.4, 0.6);
      // makeM(0.5, -1, 0.6, 0.6);
      // makeM(1.5, -1, 0.8, 0.6);
      // makeM(2.5, -1, 1, 0.6);

      // makeM(-2.5, -2, 0, 0.8);
      // makeM(-1.5, -2, 0.2, 0.8);
      // makeM(-0.5, -2, 0.4, 0.8);
      // makeM(0.5, -2, 0.6, 0.8);
      // makeM(1.5, -2, 0.8, 0.8);
      // makeM(2.5, -2, 1, 0.8);

      // makeM(-2.5, -3, 0, 1);
      // makeM(-1.5, -3, 0.2, 1);
      // makeM(-0.5, -3, 0.4, 1);
      // makeM(0.5, -3, 0.6, 1);
      // makeM(1.5, -3, 0.8, 1);
      // makeM(2.5, -3, 1, 1);

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

        renderer.render(scene, camera);
      };
      animate();
    }
    material();
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

export default Materials;
