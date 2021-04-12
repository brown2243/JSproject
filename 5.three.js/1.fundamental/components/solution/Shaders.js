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
function Shaders() {
  const ref = useRef(null);

  useEffect(() => {
    function main() {
      const canvas = ref.current;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.autoClearColor = false;

      const camera = new THREE.OrthographicCamera(
        -1, // left
        1, // right
        1, // top
        -1, // bottom
        -1, // near,
        1 // far
      );
      const scene = new THREE.Scene();
      const plane = new THREE.PlaneGeometry(2, 2);

      //       // 기본
      //       const fragmentShader = `
      // #include <common>

      // uniform vec3 iResolution;
      // uniform float iTime;

      // // By iq: https://www.shadertoy.com/user/iq
      // // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
      // void mainImage( out vec4 fragColor, in vec2 fragCoord )
      // {
      //     // Normalized pixel coordinates (from 0 to 1)
      //     vec2 uv = fragCoord/iResolution.xy;

      //     // Time varying pixel color
      //     vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

      //     // Output to screen
      //     fragColor = vec4(col,1.0);
      // }

      // void main() {
      //   mainImage(gl_FragColor, gl_FragCoord.xy);
      // }
      // `;
      //       const uniforms = {
      //         iTime: { value: 0 },
      //         iResolution: { value: new THREE.Vector3() },
      //       };

      //       const material = new THREE.ShaderMaterial({
      //         fragmentShader,
      //         uniforms,
      //       });

      const fragmentShader = `
  #include <common>

  uniform vec3 iResolution;
  uniform float iTime;
  uniform sampler2D iChannel0;

  // By Daedelus: https://www.shadertoy.com/user/Daedelus
  // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  #define TIMESCALE 0.25 
  #define TILES 8
  #define COLOR 0.7, 1.6, 2.8

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;
    
    vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));
    float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);
    p = min(max(p * 3.0 - 1.8, 0.1), 2.0);
    
    vec2 r = mod(uv * float(TILES), 1.0);
    r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));
    p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);
    
    fragColor = vec4(COLOR, 1.0) * p;
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `;
      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        "https://threejsfundamentals.org/threejs/resources/images/bayer.png"
      );
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
        iChannel0: { value: texture },
      };
      const material = new THREE.ShaderMaterial({
        fragmentShader,
        uniforms,
      });
      scene.add(new THREE.Mesh(plane, material));

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

      function render(time) {
        time *= 0.001;
        resizeRendererToDisplaySize(renderer);

        const canvas = renderer.domElement;
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        uniforms.iTime.value = time;

        renderer.render(scene, camera);
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

export default Shaders;
