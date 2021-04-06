import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import "../../node_modules/react-dat-gui/dist/index.css";
const OrbitControls = require("three-orbit-controls")(THREE);

function BufferGeometry() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
    camera.position.set(0, 0, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    function addLight(...pos) {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(...pos);
      scene.add(light);
    }
    addLight(-1, 2, 4);
    addLight(2, -2, 3);

    const vertices = [
      // front
      { pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0] }, // 0
      { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0] }, // 1
      { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1] }, // 2
      { pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1] }, // 3
      // right
      { pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0] }, // 4
      { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0] }, // 5
      { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1] }, // 6
      { pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1] }, // 7
      // back
      { pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0] }, // 8
      { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0] }, // 9
      { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1] }, // 10
      { pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1] }, // 11
      // left
      { pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0] }, // 12
      { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0] }, // 13
      { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1] }, // 14
      { pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1] }, // 15
      // top
      { pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0] }, // 16
      { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0] }, // 17
      { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1] }, // 18
      { pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1] }, // 19
      // bottom
      { pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0] }, // 20
      { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0] }, // 21
      { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1] }, // 22
      { pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1] }, // 23
    ];
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
      positions.push(...vertex.pos);
      normals.push(...vertex.norm);
      uvs.push(...vertex.uv);
    }

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(positions),
        positionNumComponents
      )
    );
    geometry.setAttribute(
      "normal",
      new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );
    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );
    geometry.setIndex([
      0,
      1,
      2,
      2,
      1,
      3, // 앞쪽
      4,
      5,
      6,
      6,
      5,
      7, // 오른쪽
      8,
      9,
      10,
      10,
      9,
      11, // 뒤쪽
      12,
      13,
      14,
      14,
      13,
      15, // 왼쪽
      16,
      17,
      18,
      18,
      17,
      19, // 상단
      20,
      21,
      22,
      22,
      21,
      23, // 하단
    ]);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/star.png"
    );

    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color, map: texture });

      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      cube.position.x = x;
      return cube;
    }

    const cubes = [
      makeInstance(geometry, 0x88ff88, 0),
      makeInstance(geometry, 0x8888ff, -4),
      makeInstance(geometry, 0xff8888, 4),
    ];

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
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.map((cube) => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
      });

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
    </div>
  );
}
export default React.memo(BufferGeometry);
