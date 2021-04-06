import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Responsive() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = document.querySelector("#responsive");
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

    const animate = () => {
      requestAnimationFrame(animate);

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();

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

    // 고해상도 모니터를 사용하는 기기에 대응할 때
    // function resizeRendererToDisplaySize(renderer) {
    //   const canvas = renderer.domElement;
    //   const pixelRatio = window.devicePixelRatio;
    //   const width = (canvas.clientWidth * pixelRatio) | 0;
    //   const height = (canvas.clientHeight * pixelRatio) | 0;
    //   const needResize = canvas.width !== width || canvas.height !== height;
    //   if (needResize) {
    //     renderer.setSize(width, height, false);
    //   }
    //   return needResize;
    // }
  }, []);
  return (
    <>
      <p>
        Three.js로 HD-DPI를 다루는 방법은 아주 다양합니다. 첫째는 아무것도 하지
        않는 것입니다. 3D 렌더링은 많은 GPU 자원을 소모하기 때문에 아마 가장
        흔한 경우일 겁니다. 2018년의 이야기이긴 하지만, 모바일 기기는 데스크탑에
        비해 GPU 성능이 부족함에도 더 높은 해상도를 가진 경우가 대부분입니다.
        현재 플래그쉽 스마트폰은 HD-DPI 약 3배의 해상도를 지녔습니다. 쉽게 말해
        HD-DPI가 아닌 기기와 비교했을 때 한 픽셀 당 픽셀 수가 1:9라는 것이고
        이는 9배나 더 많은 렌더링 작업을 처리해야 한다는 것을 의미하죠. 9배 많은
        픽셀을 처리하는 건 굉장히 까다로운 작업이지만, 만약 코드를 저대로 내버려
        둔다면 우리의 코드가 1픽셀을 계산할 때마다 브라우저는 해당 픽셀보다 3배
        큰 픽셀을 렌더링해야 합니다(3배 곱하기 3배 = 9배 많은 픽셀). 이는 낮은
        FPS, 즉 화면이 버벅거리게 만들 것이므로 특히 무거운 Three.js 앱을 만들
        때는 지양해야 하는 요소이죠. 물론 지양해야 한다는 건 기기의 해상도에
        따라 화면을 렌더링할 다른 방법들이 더 있다는 의미입니다. 하나는
        rederer.setPixelRatio 메서드를 이용해 해상도 배율을 알려주는 것입니다.
        브라우저로부터 CSS 픽셀과 실제 기기 픽셀의 배율을 받아 Three.js에게
        넘겨주는 것이죠. 그러면 renderer.setSize는 이제 알아서 사이즈에 배율을
        곱해 리사이징할 것입니다....만 이 방법은 추천하지 않습니다. 다른 방법은
        canvas를 리사이징할 때 직접 계산하는 것입니다.{" "}
        <canvas
          id="responsive"
          style={{ width: "50%", height: "50%", display: "inline" }}
        ></canvas>
        객관적으로 따져봐도 이 방법이 훨씬 낫습니다. 이 방법으로는 개발자가
        원하는 결과가 나오니까요. Three.js로 앱을 만들 때 언제 canvas의
        드로잉버퍼 사이즈를 가져와야 할지 특정하기란 어렵습니다. 예를 들어
        전처리 필터를 만든다거나, gl_FragCoord에 접근하는 쉐이더를 만든다거나,
        스크린샷을 찍는다거나, GPU가 제어하는 픽셀 수를 가져 온다거나, 2D
        canvas에 뭔가를 그린다던가 하는 경우가 있죠. 실제 크기 대신
        setPixelRatio를 사용하면 대부분의 경우 반환값이 개발자가 예상한 것과
        다를 뿐더러, 이 반환값을 언제 사용할지, Three.js가 쓰는 크기는 무엇인지
        일일이 계산해야 합니다. 직접 배율을 계산하면 어떤 값을 Three.js가 쓰는지
        확실히 알 수 있고, 예외도 줄어듭니다.
      </p>
    </>
  );
}

export default Responsive;
