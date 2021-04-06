import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Textures() {
  const ref = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    const canvas = ref.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // ref.current.appendChild(renderer.domElement);

    const objects = [];
    const spread = 15;

    function addObject(x, y, obj) {
      obj.position.x = x * spread;
      obj.position.y = y * spread;

      scene.add(obj);
      objects.push(obj);
    }
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    {
      const loader = new THREE.TextureLoader();
      const material = new THREE.MeshBasicMaterial({
        map: loader.load(
          "https://threejsfundamentals.org/threejs/resources/images/wall.jpg"
        ),
      });
      const cube = new THREE.Mesh(geometry, material);
      addObject(-0.5, 0, cube);
    }
    {
      const loadManager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(loadManager);
      const materials = [
        new THREE.MeshBasicMaterial({
          map: loader.load(
            "https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg"
          ),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load(
            "https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg"
          ),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load(
            "https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg"
          ),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load(
            "https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg"
          ),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load(
            "https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg"
          ),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load(
            "https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg"
          ),
        }),
      ];
      const cube = new THREE.Mesh(geometry, materials);
      addObject(0.5, 0, cube);
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

export default Textures;
