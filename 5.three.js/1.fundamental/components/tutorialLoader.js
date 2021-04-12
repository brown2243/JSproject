import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function tutorialLine() {
  const ref = useRef(null);

  useEffect(() => {
    let shoe;
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color("skyblue");
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true }); // alpha: true
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);
    // {
    //   const ambient = new THREE.AmbientLight(0x404040, 10);
    //   scene.add(ambient);
    // }
    {
      const skyColor = 0xb1e1ff; // light blue
      const groundColor = 0xb97a20; // brownish orange
      const intensity = 1.5;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }
    {
      const color = 0xffffff;
      const intensity = 1.5;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(5, 10, 2);
      scene.add(light);
      scene.add(light.target);
    }

    const loader = new GLTFLoader();
    loader.load(
      "/models/shoe/scene.gltf",
      (gltf) => {
        scene.add(gltf.scene);
        console.log(gltf);
        shoe = gltf.scene.children[0];
        animate();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    function animate() {
      requestAnimationFrame(animate);
      shoe.rotation.z += 0.005;
      renderer.render(scene, camera);
    }
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);
  }, []);

  return <div id="info" ref={ref}></div>;
}

export default tutorialLine;
