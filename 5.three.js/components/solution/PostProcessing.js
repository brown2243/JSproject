import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { BufferGeometryUtils } from "../module/BufferGeometryUtils";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const OrbitControls = require("three-orbit-controls")(THREE);

// 후처리
function PostProcessing() {
  const ref = useRef(null);

  useEffect(() => {
    function main() {
      const canvas = ref.current;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      const fov = 75;
      const aspect = window.innerWidth / window.innerHeight; // the canvas default
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;

      const scene = new THREE.Scene();

      const boxWidth = 0.5;
      const boxHeight = 0.5;
      const boxDepth = 0.5;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;
        return cube;
      }

      const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -1),
        makeInstance(geometry, 0xaa8844, 1),
      ];

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      // const bloomPass = new BloomPass(
      //   1, // 강도
      //   25, // 커널(kernel) 크기
      //   4, // 시그마 ?
      //   256 // 렌더 타겟의 해상도를 낮춤
      // );
      // composer.addPass(bloomPass);

      // const filmPass = new FilmPass(
      //   0.35, // 노이즈 강도
      //   0.025, // 스캔라인 강도
      //   648, // 스캔라인 개수
      //   false // 흑백
      // );
      // filmPass.renderToScreen = true;
      // composer.addPass(filmPass);

      const colorShader = {
        uniforms: {
          tDiffuse: { value: null },
          color: { value: new THREE.Color(0x88ccff) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main() {
            vec4 previousPassColor = texture2D(tDiffuse, vUv);
            gl_FragColor = vec4(
                previousPassColor.rgb * color,
                previousPassColor.a);
          }
        `,
      };

      const colorPass = new ShaderPass(colorShader);
      colorPass.renderToScreen = true;
      composer.addPass(colorPass);

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

      let then = 0;
      function render(now) {
        now *= 0.001; // 초 단위로 변환
        const deltaTime = now - then;
        then = now;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          composer.setSize(canvas.width, canvas.height);
        }

        cubes.forEach((cube, ndx) => {
          const speed = 1 + ndx * 0.1;
          const rot = now * speed;
          cube.rotation.x = rot;
          cube.rotation.y = rot;
        });

        composer.render(deltaTime);

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
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

export default PostProcessing;
