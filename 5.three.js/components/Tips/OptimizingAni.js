import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as TWEEN from "tween";
import { BufferGeometryUtils } from "../module/BufferGeometryUtils";

import style from "./Style.module.css";

const OrbitControls = require("three-orbit-controls")(THREE);

class TweenManger {
  constructor() {
    this.numTweensRunning = 0;
  }
  _handleComplete() {
    --this.numTweensRunning;
    console.assert(this.numTweensRunning >= 0);
  }
  createTween(targetObject) {
    const self = this;
    ++this.numTweensRunning;
    let userCompleteFn = () => {};
    // Tween 인스턴스를 만들고 onCompelete에 콜백 함수를 설치합니다.
    const tween = new TWEEN.Tween(targetObject).onComplete(function (...args) {
      self._handleComplete();
      userCompleteFn.call(this, ...args);
    });
    // Tween 인스턴스의 onComplete 함수를 바꿔 사용자가 콜백 함수를
    // 지정할 수 있도록 합니다.
    tween.onComplete = (fn) => {
      userCompleteFn = fn;
      return tween;
    };
    return tween;
  }
  update() {
    TWEEN.update();
    return this.numTweensRunning > 0;
  }
}

function OptimizingAni() {
  const ref = useRef(null);

  useEffect(() => {
    function main() {
      const canvas = ref.current;
      const renderer = new THREE.WebGLRenderer({ canvas });
      const tweenManager = new TweenManger();

      const fov = 60;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 10;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2.5;

      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 1.2;
      controls.maxDistance = 4;
      controls.update();

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("black");

      {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(
          "https://threejsfundamentals.org/threejs/resources/images/world.jpg",
          render
        );
        const geometry = new THREE.SphereGeometry(1, 64, 32);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        scene.add(new THREE.Mesh(geometry, material));
      }

      async function loadFile(url) {
        const req = await fetch(url);
        return req.text();
      }

      function parseData(text) {
        const data = [];
        const settings = { data };
        let max;
        let min;
        // split into lines
        text.split("\n").forEach((line) => {
          // split the line by whitespace
          const parts = line.trim().split(/\s+/);
          if (parts.length === 2) {
            // only 2 parts, must be a key/value pair
            settings[parts[0]] = parseFloat(parts[1]);
          } else if (parts.length > 2) {
            // more than 2 parts, must be data
            const values = parts.map((v) => {
              const value = parseFloat(v);
              if (value === settings.NODATA_value) {
                return undefined;
              }
              max = Math.max(max === undefined ? value : max, value);
              min = Math.min(min === undefined ? value : min, value);
              return value;
            });
            data.push(values);
          }
        });
        return Object.assign(settings, { min, max });
      }
      function dataMissingInAnySet(fileInfos, latNdx, lonNdx) {
        for (const fileInfo of fileInfos) {
          if (fileInfo.file.data[latNdx][lonNdx] === undefined) {
            return true;
          }
        }
        return false;
      }

      function makeBoxes(file, hueRange, fileInfos) {
        const { min, max, data } = file;
        const range = max - min;
        // 아래 헬퍼 Object3D는 육면체들의 위치 변화를 간단하게 만들어줍니다.
        // lonHelper를 Y축으로 돌려 경도(longitude)를 맞출 수 있습니다.
        const lonHelper = new THREE.Object3D();
        scene.add(lonHelper);
        // latHelper를 X축으로 돌려 위도(latitude)를 맞출 수 있습니다.
        const latHelper = new THREE.Object3D();
        lonHelper.add(latHelper);
        // positionHelper는 다른 요소의 기준축을 구체의 끝에 맞추는 역할을 합니다.
        const positionHelper = new THREE.Object3D();
        positionHelper.position.z = 1;
        latHelper.add(positionHelper);
        // 육면체의 중심을 옮겨 양의 Z축 방향으로 커지게 합니다.
        const originHelper = new THREE.Object3D();
        originHelper.position.z = 0.5;
        positionHelper.add(originHelper);

        const color = new THREE.Color();

        const lonFudge = Math.PI * 0.5;
        const latFudge = Math.PI * -0.135;
        const geometries = [];

        data.forEach((row, latNdx) => {
          row.forEach((value, lonNdx) => {
            if (dataMissingInAnySet(fileInfos, latNdx, lonNdx)) {
              return;
            }
            const amount = (value - min) / range;

            const boxWidth = 1;
            const boxHeight = 1;
            const boxDepth = 1;
            const geometry = new THREE.BoxGeometry(
              boxWidth,
              boxHeight,
              boxDepth
            );

            // 헬퍼들을 특정 위도와 경도로 이동시킵니다.
            lonHelper.rotation.y =
              THREE.MathUtils.degToRad(lonNdx + file.xllcorner) + lonFudge;
            latHelper.rotation.x =
              THREE.MathUtils.degToRad(latNdx + file.yllcorner) + latFudge;

            // originHelper의 위치를 해당 geometry의 위치로 지정합니다.
            positionHelper.scale.set(
              0.005,
              0.005,
              THREE.MathUtils.lerp(0.01, 0.5, amount)
            );
            originHelper.updateWorldMatrix(true, false);
            geometry.applyMatrix4(originHelper.matrixWorld);

            // 색상값을 계산합니다.
            const hue = THREE.MathUtils.lerp(0.7, 0.3, amount);
            const saturation = 1;
            const lightness = THREE.MathUtils.lerp(0.4, 1.0, amount);
            color.setHSL(hue, saturation, lightness);
            // RGB 색상값을 0부터 255까지의 배열로 변환합니다.
            const rgb = color.toArray().map((v) => v * 255);

            // 각 정점의 색을 배열로 저장합니다.
            const numVerts = geometry.getAttribute("position").count;
            const itemSize = 3; // r, g, b
            const colors = new Uint8Array(itemSize * numVerts);

            // 색상값을 각 정점에 지정할 색상으로 변환합니다.
            colors.forEach((v, ndx) => {
              colors[ndx] = rgb[ndx % 3];
            });

            const normalized = true;
            const colorAttrib = new THREE.BufferAttribute(
              colors,
              itemSize,
              normalized
            );
            geometry.setAttribute("color", colorAttrib);

            geometries.push(geometry);
          });
        });
        // 생성한 geometry를 전부 합칩니다.
        // const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
        //   geometries,
        //   false
        // );
        // const material = new THREE.MeshBasicMaterial({ vertexColors: true }); // vertexColors 안됨
        // const mesh = new THREE.Mesh(mergedGeometry, material);
        // scene.add(mesh);
        // return mesh;
        return BufferGeometryUtils.mergeBufferGeometries(geometries, false);
      }

      async function loadData(info) {
        const text = await loadFile(info.url);
        info.file = parseData(text);
      }

      async function loadAll() {
        const fileInfos = [
          {
            name: "men",
            hueRange: [0.7, 0.3],
            url:
              "https://threejsfundamentals.org/threejs/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc",
          },
          {
            name: "women",
            hueRange: [0.9, 1.1],
            url:
              "https://threejsfundamentals.org/threejs/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014ft_2010_cntm_1_deg.asc",
          },
        ];

        await Promise.all(fileInfos.map(loadData));

        function mapValues(data, fn) {
          return data.map((row, rowNdx) => {
            return row.map((value, colNdx) => {
              return fn(value, rowNdx, colNdx);
            });
          });
        }

        function makeDiffFile(baseFile, otherFile, compareFn) {
          let min;
          let max;
          const baseData = baseFile.data;
          const otherData = otherFile.data;
          const data = mapValues(baseData, (base, rowNdx, colNdx) => {
            const other = otherData[rowNdx][colNdx];
            if (base === undefined || other === undefined) {
              return undefined;
            }
            const value = compareFn(base, other);
            min = Math.min(min === undefined ? value : min, value);
            max = Math.max(max === undefined ? value : max, value);
            return value;
          });
          // make a copy of baseFile and replace min, max, and data
          // with the new data
          return { ...baseFile, min, max, data };
        }

        // generate a new set of data
        {
          const menInfo = fileInfos[0];
          const womenInfo = fileInfos[1];
          const menFile = menInfo.file;
          const womenFile = womenInfo.file;

          function amountGreaterThan(a, b) {
            return Math.max(a - b, 0);
          }
          fileInfos.push({
            name: ">50%men",
            hueRange: [0.6, 1.1],
            file: makeDiffFile(menFile, womenFile, (men, women) => {
              return amountGreaterThan(men, women);
            }),
          });
          fileInfos.push({
            name: ">50% women",
            hueRange: [0.0, 0.4],
            file: makeDiffFile(womenFile, menFile, (women, men) => {
              return amountGreaterThan(women, men);
            }),
          });
        }

        // show the selected data, hide the rest
        function showFileInfo(fileInfos, fileInfo) {
          fileInfos.forEach((info) => {
            const visible = fileInfo === info;
            info.elem.className = visible ? "selected" : "";
            const targets = {};
            fileInfos.forEach((info, i) => {
              targets[i] = info === fileInfo ? 1 : 0;
            });
            const durationInMs = 1000;
            // new TWEEN.Tween(mesh.morphTargetInfluences)
            tweenManager
              .createTween(mesh.morphTargetInfluences)
              .to(targets, durationInMs)
              .start();
          });
          requestRenderIfNotRequested();
        }
        // 데이터 그룹에 geometry를 각각 만듭니다.
        const geometries = fileInfos.map((info) => {
          return makeBoxes(info.file, info.hueRange, fileInfos);
        });

        // 첫 번째 geometry를 기준으로 다른 geometry를 morphtargets로 지정합니다.
        const baseGeometry = geometries[0];
        baseGeometry.morphAttributes.position = geometries.map(
          (geometry, ndx) => {
            const attribute = geometry.getAttribute("position");
            const name = `target${ndx}`;
            attribute.name = name;
            return attribute;
          }
        );

        const colorAttributes = geometries.map((geometry, ndx) => {
          const attribute = geometry.getAttribute("color");
          const name = `morphColor${ndx}`;
          attribute.name = `color${ndx}`; // 디버깅용
          return { name, attribute };
        });

        const material = new THREE.MeshBasicMaterial({
          vertexColors: true,
          morphTargets: true,
        });
        const vertexShaderReplacements = [
          {
            from: "#include <morphtarget_pars_vertex>",
            to: `
                uniform float morphTargetInfluences[8];
              `,
          },
          {
            from: "#include <morphnormal_vertex>",
            to: `
              `,
          },
          {
            from: "#include <morphtarget_vertex>",
            to: `
                transformed += (morphTarget0 - position) * morphTargetInfluences[0];
                transformed += (morphTarget1 - position) * morphTargetInfluences[1];
                transformed += (morphTarget2 - position) * morphTargetInfluences[2];
                transformed += (morphTarget3 - position) * morphTargetInfluences[3];
              `,
          },
          {
            from: "#include <color_pars_vertex>",
            to: `
                varying vec3 vColor;
                attribute vec3 morphColor0;
                attribute vec3 morphColor1;
                attribute vec3 morphColor2;
                attribute vec3 morphColor3;
              `,
          },
          {
            from: "#include <color_vertex>",
            to: `
                vColor.xyz = morphColor0 * morphTargetInfluences[0] +
                             morphColor1 * morphTargetInfluences[1] +
                             morphColor2 * morphTargetInfluences[2] +
                             morphColor3 * morphTargetInfluences[3];
              `,
          },
        ];
        material.onBeforeCompile = (shader) => {
          vertexShaderReplacements.forEach((rep) => {
            shader.vertexShader = shader.vertexShader.replace(rep.from, rep.to);
          });
        };

        const mesh = new THREE.Mesh(baseGeometry, material);
        scene.add(mesh);

        function updateMorphTargets() {
          // 색 속성을 전부 제거합니다.
          for (const { name } of colorAttributes) {
            baseGeometry.deleteAttribute(name);
          }

          // Three.js는 influence 값을 제공하지 않기에 추측하는 수밖에 없습니다. 물론 소스 코드가 바뀌면 이 값을 수정해야 하겠죠.
          const maxInfluences = 8;

          // Three.js는 어떤 morphtarget을 사용할 건지, 어떤 속성에 morphtarget을 지정할 건지 알려주지 않습니다.
          // Three.js의 알고리즘이 바뀌면 이 코드를 수정해야 할 겁니다.
          mesh.morphTargetInfluences
            .map((influence, i) => [i, influence]) // 인덱스값과 influence 값을 매핑합니다.
            .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])) // influence 값을 내림차순으로 정렬합니다.
            .slice(0, maxInfluences) // 상위 값들만 남겨둡니다.
            .sort((a, b) => a[0] - b[0]) // 인덱스값을 기준으로 정렬합니다.
            .filter((a) => !!a[1]) // influence 값이 없는 요소를 제거합니다.
            .forEach(([ndx], i) => {
              // 속성에 지정합니다.
              const name = `morphColor${i}`;
              baseGeometry.setAttribute(name, colorAttributes[ndx].attribute);
            });
        }

        const uiElem = document.querySelector("#ui");
        fileInfos.forEach((info) => {
          const div = document.createElement("div");
          info.elem = div;
          div.textContent = info.name;
          uiElem.appendChild(div);
          function show() {
            showFileInfo(fileInfos, info);
          }
          div.addEventListener("mouseover", show);
          div.addEventListener("touchstart", show);
        });
        // show the first set of data
        showFileInfo(fileInfos, fileInfos[0]);

        return updateMorphTargets;
      }

      let updateMorphTargets = () => {};
      loadAll().then((fn) => {
        updateMorphTargets = fn;
      });

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

      let renderRequested = false;

      function render() {
        renderRequested = undefined;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        if (tweenManager.update()) {
          requestRenderIfNotRequested();
        }
        updateMorphTargets();

        controls.update();
        renderer.render(scene, camera);
      }
      render();

      function requestRenderIfNotRequested() {
        if (!renderRequested) {
          renderRequested = true;
          requestAnimationFrame(render);
        }
      }

      controls.addEventListener("change", requestRenderIfNotRequested);
      window.addEventListener("resize", requestRenderIfNotRequested);
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
        style={{ width: "100%", height: "100%", display: "block" }}
      ></canvas>
      <div id="ui" className={style.ui}></div>
    </div>
  );
}

export default OptimizingAni;
