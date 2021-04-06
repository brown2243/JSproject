import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import "../../node_modules/react-dat-gui/dist/index.css";
const OrbitControls = require("three-orbit-controls")(THREE);

function RenderTargets() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    camera.position.set(0, 0, 2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      rtScene.add(cube);
      cube.position.x = x;
      return cube;
    }

    // WebGLRenderTarget 렌더러
    const rtWidth = 512;
    const rtHeight = 512;
    const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);

    const rtFov = 75;
    const rtAspect = rtWidth / rtHeight;
    const rtNear = 0.1;
    const rtFar = 5;
    const rtCamera = new THREE.PerspectiveCamera(
      rtFov,
      rtAspect,
      rtNear,
      rtFar
    );
    rtCamera.position.z = 2;

    const rtScene = new THREE.Scene();
    rtScene.background = new THREE.Color("red");

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      rtScene.add(light);
    }

    const rtCubes = [
      makeInstance(geometry, 0x44aa88, 0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844, 2),
    ];

    //
    //
    const material = new THREE.MeshPhongMaterial({
      map: renderTarget.texture,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

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

      rtCubes.map((cube) => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
      });

      renderer.setRenderTarget(renderTarget);
      renderer.render(rtScene, rtCamera);
      renderer.setRenderTarget(null);

      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;

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
export default React.memo(RenderTargets);
