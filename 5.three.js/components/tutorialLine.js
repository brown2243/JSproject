import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function tutorialLine() {
  const ref = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const points = [];
    points.push(new THREE.Vector3(-8, 0, 0));
    points.push(new THREE.Vector3(8, 0, 0));
    points.push(new THREE.Vector3(-5, -8, 0));
    points.push(new THREE.Vector3(0, 5, 0));
    points.push(new THREE.Vector3(5, -8, 0));
    points.push(new THREE.Vector3(-8, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    renderer.render(scene, camera);
  }, []);
  return <div ref={ref} />;
}

export default tutorialLine;
