# 3/17

## Three.js 시작

### Tutorial

https://threejs.org/docs/index.html#manual/ko/introduction/Creating-text

three.js로 무언가를 표현하려면 scene, camera 그리고 renderer가 필요합니다. 이를 통해 카메라로 장면을 구현할 수 있습니다.

PerspectiveCamera

첫 번째 속성은 field of view(시야각)입니다. FOV(시야각)는 해당 시점의 화면이 보여지는 정도를 나타냅니다. 값은 각도 값으로 설정합니다.

두 번째 속성은 aspect ratio(종횡비)입니다. 대부분의 경우 요소의 높이와 너비에 맞추어 표시하게 할텐데, 그렇지 않으면 와이드스크린에 옛날 영화를 트는 것처럼 이미지가 틀어져 보일 것입니다.

다음 두 속성은 near 와 far 절단면입니다. 무슨 뜻인가 하면, far 값 보다 멀리 있는 요소나 near 값보다 가까이 있는 오브젝트는 렌더링 되지 않는다는 뜻입니다. 앱 성능 향상을 위해 사용할 수 있습니다.

ex) const camera = new THREE.PerspectiveCamera(시야각,종횡비,near,far)

Render

인스턴스를 생섬함과 동시에, 렌더링 할 곳의 크기를 설정해줘야 합니다.
사이즈는 그대로 유지하고 싶지만 더 낮은 해상도로 렌더링하고 싶을 경우, setSize의 updateStyle(세 번째 인자)를 false로 불러오면 됩니다. setSize(window.innerWidth/2, window.innerHeight/2, false)처럼 사용하면 <canvas>가 100%의 높이, 너비로 되어있다는 기준 하에 절반의 해상도로 렌더링 될 것입니다.

ex)
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

선 그리기
선을 그리기 위해서는 LineBasicMaterial나 LineDashedMaterial를 사용하면 됩니다.
그 다음에는 꼭짓점에 대한 기하학을 정의해야 합니다:
선은 연속된 꼭짓점 쌍 사이에 그려지고 첫 번재와 마지막 꼭짓점에는 그려지지 않습니다. (선은 닫혀있지 않습니다.)

이제 두 선을 그리기 위한 점과 재질이 있으니, 합쳐서 선을 만들 수 있습니다.
이제 남은 것은 scene에 추가하고 render를 하는 것입니다.

```
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );
renderer.render( scene, camera );
```

텍스트 만들기

1. HTML을 사용하는 것은 텍스트를 추가하는 가장 쉽고 빠른 방법입니다. 대부분의 three.js 예제에서 오버레이 설명에 사용되는 방식입니다.
2. 캔버스에 텍스트를 그리고 Texture로 사용
   three.js scene에 손쉽게 텍스트를 그리고싶은 경우에 이 메서드를 사용하세요.

3. 본인이 가장 선호하는 3D 앱으로 만들고 three.js로 export 하세요.
   본인의 3d 작업 앱을 선호하는 경우 이 메서드를 사용해 three.js로 모델을 import하세요.

4. 절차적 텍스트 geometry
   THREE.js만을 사용해 절차적 및 동적 3D 텍스트 geometry를 사용하고 싶으면, geometry이 THREE.TextGeometry의 인스턴스인 mesh를 사용하면 됩니다.

NEXT.js 에서 import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";가 작동하지 않는 문제
에러메세지 SyntaxError: Cannot use import statement outside a module
nextjs를 사용해서 생기는 문제로 보임 여러 사람들이 이 문제를 겪은듯

- https://oslavdev.medium.com/load-animated-gltf-models-in-next-js-app-with-three-js-8cf0a5d99e10
  링크에서 따라 next-transpile-modules 설치후 next.config.js만들고 했는데 새로운 에러 발생
  [BABEL] Note: The code generator has deoptimised the styling of C:\Users\brown\dev\jsproject2\threejs\node_modules\three\build\three.js as it exceeds the max of 500KB.
  안되더니 갑자기 해결

- Load가 됐다고 Log에 나옴에도 모델이 화면에 나오지 않는 문제
  z-index체크, scene color가 검은색이라 혹시 모델이 안보이나 싶어서 배경색을 바꿔보니
  모델이 검은색으로 나오는 것을 확인
  알아보니 빛이 없어서 그렇네. 빛추가후 모델 나오는거 확인!

# https://threejsfundamentals.org/

# 공홈 듀토리얼은 정말 간단한 수준이고, 이 링크가 참 정리가 잘 되어 있어서 이거보면서 학습

Three.js = WebGL이라고 착각하기 쉽죠. 하지만 WebGL은 점, 선, 삼각형만을 그리는 아주 단순한 시스템입니다. WebGL로 직접 무언가를 만들려면 상당히 많은 양의 코드를 짜야 하죠. 만약 씬(scenes), 광원, 그림자, 물체, 텍스처 등 3차원 세계를 구현한다면 머리도 꽤 복잡하겠거니와 코드 자체도 굉장히 복잡할 겁니다. Three.js는 이런 3D 요소들의 처리를 도와 직관적인 코드를 짤 수 있도록 해줍니다.

먼저 Renderer가 있습니다. Three.js의 핵심 객체이죠. Renderer는 Scene과 Camera 객체를 넘겨 받아 카메라의 절두체(frustum) 안 3D 씬의 일부를 평면(2차원) 이미지로 렌더링합니다.

씬 그래프(Scene graph)는 Scene 또는 다수의 Mesh, Light, Group, Object3D, Camera로 이루어진 트리 구조와 유사합니다. Scene은 씬 그래프의 최상위 노드로서 배경색(background color), 안개(fog) 등의 요소를 포함합니다. Scene에 포함된 객체들 또한 부모/자식의 트리 구조로 이루어지며, 이는 각 객체의 유래와 방향성을 나타냅니다. 쉽게 말해 자식 객체의 위치(position)와 방향(orientation)이 부모 기준이라는 거죠. 예를 들어 자동차의 바퀴가 자동차 객체의 자식 객체라면, 자동차 객체의 방향을 움직일 때, 바퀴 객체의 방향 또한 같이 움직입니다(더 자세한 내용은 씬 그래프에 관한 글에서 확인할 수 있습니다)

Camera가 도표에서 반쯤 나간 것이 보이나요? 이는 의도된 것으로, 다른 객체와 달리 Camera는 굳이 씬 그래프에 포함될 필요가 없음을 보여주기 위함입니다. 물론 다른 객체와 마찬가지로 Camera 또한 다른 객체의 자식 객체가 될 수 있습니다. 이러면 부모 객체에 따라 Camera 또한 움직이겠죠. 씬 그래프에 관한 글 마지막에 여러개의 Camera를 넣는 예제가 있으니 참고하시기 바랍니다.

Mesh는 어떤 Material로 하나의 Geometry를 그리는 객체입니다. Material, Geometry는 재사용이 가능하여 여러개의 Mesh가 하나의 Material 또는 Geometry를 동시에 참조할 수 있습니다. 파란색 정육면체 2개를 그린다고 해보죠. 일단 두 정육면체의 위치가 달라야 하니, 2개의 Mesh가 필요합니다. 그리고 정점(vertext, 꼭지점) 데이터를 가진 한 개의 Geometry와 채색을 위한 하나의 Material이 필요하겠죠. 이때 각 Mesh는 객체를 복사할 필요 없이, 같은 Geometry 그리고 Material을 참조할 수 있습니다.

Geometry는 기하학 객체의 정점 데이터입니다. 구(sphere), 정육면체(cube), 면(plane), 개, 고양이, 사람, 나무, 건물 등 아주 다양한 것이 될 수 있죠. Three.js는 기본적으로 몇 가지의 내장(built-in) 기하학 객체를 제공합니다. 물론 직접 기하학 객체를 만들 수도 있고, 파일에서 기하학 객체를 불러올 수도 있죠.

Material은 기하학 객체를 그리는 데 사용하는 표면 속성입니다. 색이나 밝기 등을 지정할 수 있죠. 하나의 Material는 여러개의 Texture를 사용할 수 있습니다. 기하학 객체의 표면을 이미지로 덮어씌울 때 주로 사용하죠.

Texture는 이미지나 파일에서 로드한 이미지, canvas로 생성한 이미지 또는 다른 Scene 객체에서 렌더링한 결과물에 해당합니다.

Light는 여러 종류의 광원에 해당합니다.

dat.GUI 문제
react에서 인지, nextjs에서 인지 dat.gui가 작동하지 않음

1. gui window is not defined
   이거는 nextjs가 서버렌더링 그때 webapi 의window객체가 없어서 발생하는 에러로 추정

그 부분을 방지해주는 코드
import dynamic from "next/dynamic";
const dat = dynamic(() => import("dat.gui"), {
ssr: false,
})

2. dat.GUI is not a constructor
   import \* as dat from 'dat.gui'
   const gui = new dat.GUI()
   gui 객체를 만드는 데 실패 함.
   그래서 검색도중 react-dat-gui 라이브러리를 발견
   아마 react에서는 이걸로 해야하나봄

찾아보던중 react-dat-gui 라이브러리 발견

# materials

재질의 속성(property)를 정하는 방법은 크게 두 가지로 나뉩니다.
하나는 이전처럼 생성자를 호출할 때 값을 넘겨주는 것이고,

```
const material = new THREE.MeshPhongMaterial({
  color: 0xFF0000,    // 빨강 (CSS처럼 문자열로 넘겨줄 수도 있음. "#ff0000")
  flatShading: true,
});
```

```
material.color.set(0x00FFFF);    // CSS의 #RRGGBB 형식
material.color.set(cssString);   /* CSS 색상 문자열, 예를 들어 'purple', '#F32',
                                  * 'rgb(255, 127, 64)',
                                  * 'hsl(180, 50%, 25%)' 등
                                  */
material.color.set(someColor)    // THREE.Color에 정의된 static 색상
material.color.setHSL(h, s, l)   // hsl 색상, 0부터 1까지
material.color.setRGB(r, g, b)   // rgb 색상, 0부터 1까지
```

MeshBasicMaterial은 광원의 영향을 받지 않습니다.
MeshLambertMaterial은 정점에서만 광원을 계산하고,
MeshPhongMaterial은 픽셀 하나하나 전부 광원을 계산합니다.
뿐만 아니라 MeshPhongMaterial은 반사점(specular highlights, 물체가 조명을 받을 때 물체에 나타나는 밝은 점)도 지원합니다.
MeshPhongMaterial의 shininess 속성으로 반사점의 밝기를 조절할 수 있습니다(기본값 30).

만약 MeshLambertMaterial이나 MeshPhongMaterial의 emissive 속성에 색상값을 지정하고, (MeshPhongMaterial은 shininess도 0으로 지정해야함) color 속성을 검정으로 지정하면 MeshBasicMaterial과 마찬가지로 입체감이 사라집니다.

왜 MeshPhongMaterial로 MeshBasicMaterial과 MeshLambertMaterial을 구현할 수 있는데 3가지로 분리해 놓았을까요? 이미 감을 잡으셨겠지만, 재질이 정교할수록 GPU의 부담이 커지기 때문입니다. GPU 성능이 낮은 저사양 기기에서는 덜 정교한 재질을 씀으로써 GPU의 부담을 줄일 수 있죠. 또한 복잡한 표현이 필요 없다면 더 간단한 재질을, 광원 효과가 아예 필요 없다면 MeshBasicMaterial을 사용하는 것이 좋습니다.

MeshToonMaterial은 MeshPhongMaterial과 유사하나, 큰 차이점이 하나 있습니다. 부드럽게 쉐이딩(shading)하는 대신, MeshToonMaterial은 그라디언트 맵(gradient map)을 사용합니다. 기본적으로 MeshToonMaterial은 처음 70%까지는 밝고 다음 100%까지는 어두운 그라디언트 맵을 사용하나, 그라디언트 맵을 직접 지정해 줄 수도 있죠. MeshToonMaterial로 만든 물체는 투톤을 띄어 카툰 느낌을 줍니다.

다음으로 살펴 볼 두 재질은 물리 기반 렌더링을 위한 재질입니다. 물리 기반 렌더링(Physically Based Rendering)은 줄여서 PBR이라고 하죠.
위에서 살펴본 재질들은 재질을 3D처럼 보이게 하기 위해 간단한 수학을 사용하나, 이는 실제 세계와는 다릅니다. 이 두 가지 PBR 재질은 실제 세계에서처럼 물체를 구현하기 위해 훨씬 복잡한 수학을 사용하죠.

첫 번째는 MeshStandardMaterial입니다.MeshPhongMaterial과 MeshStandardMaterial의 가장 큰 차이점은 사용하는 속성이 다르다는 점입니다. MeshPhongMaterial은 shininess를 사용하지만, MeshStandardMaterial은 roughness와 metalness 두 가지 속성을 사용합니다.

roughness는 roughness는 0부터 1까지의 숫자값으로, shininess의 반대입니다. 높은 roughness를 가진 물체, 예를 들어 야구공은 빛 반사가 거의 없지만, 반대로 낮은 roughness를 가진 물체, 당구공은 매우 번들번들하죠.

metalness는 얼마나 금속성입니다. 얼마나 금속 재질에 가까울 것인가로써, 0은 아예 금속 같지 않은 것이고, 1은 완전히 금속처럼 보이는 것을 의미합니다

MeshPhysicalMaterial은 MeshStandardMaterial과 기본적으로 같지만, 0부터 1까지의 clearcoat 속성으로 표면에 코팅 세기를 설정하고, clearcoatRoughness 속성으로 코팅의 거침 정도를 설정한다는 점이 다릅니다.

아래는 위의 예제와 마찬가지로 roughness와 metalness 속성을 주고 clearcoat 속성과 clearcoatRoughness 속성을 조정할 수 있도록 한 예제입니다.

여태까지 살펴본 Three.js의 기본 재질을 성능이 빠른 것부터 나열하면,
MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡
MeshStandardMaterial ➡ MeshPhysicalMaterial

# lights

AmbientLight(자연광) new THREE.AmbientLight(color, intensity);
물체들이 평평하고, 윤곽이 뚜렷하지 않습니다. AmbientLight는 물체와 조명의 색, 그리고 조명의 밝기를 곱한 것과 같죠.

HemisphereLight(반구광)
HemisphereLight는 천장과 바닥의 색을 인자로 받아, 물체의 천장을 바라보는 면은 천장 색, 바닥을 바라보는 면은 바닥 색으로 혼합합니다.
이 또한 그다지 입체적이지 않습니다. 아까보다는 낮지만 전체적으로 2D처럼 보이네요. HemisphereLight는 주로 풍경을 표현하거나 할 때 다른 조명과 함께 사용합니다. 다른 조명과 조합할 때 유용하고, 간단히는 AmbientLight 대신 사용할 수 있죠.

DirectionalLight(직사광)
주로 태양을 표현할 때 사용합니다.

PointLight는 한 점에서 무한히 뻗어나가는 광원입니다.

SpotLight
스포트라이트는 비유하자면 원뿔 안의 PointLight입니다. 차이점은 원뿔 안에서만 빛난다는 점이죠. SpotLight의 원뿔은 종류는 외부 원뿔과 내부 원뿔 두 가지입니다. 빛의 밝기는 내부 원뿔에서 가장 세고, 외부 원뿔에 가까워질수록 0까지 낮아집니다.

RectAreaLight
마지막으로 살펴볼 조명은 RectAreaLight입니다. 이름 그대로 사각 형태의 조명으로, 형광등이나 천장의 유리를 통과하는 태양빛을 표현하기에 적합합니다.

WebGLRenderer의 physicallyCorrectLights(물리 기반 조명) 설정이 있습니다.
이는 거리에 따라 빛이 어떻게 떨어질지 결정하는 속성으로, PointLight와 SpotLight가 이 설정의 영향을 받습니다.
RectAreaLight는 마찬가지로 설정의 영향도 받고, 기본적으로 이 설정을 사용하죠.
이 설정을 사용하면 기본적으로 조명의 distance나 intensity 대신 power 속성을 루멘(lumens) 단위로 설정해야 합니다.
그러면 Three.js는 물리적 계산을 통해 실제 광원을 흉내내죠.
예제의 거리 단위는 미터(meters)이니, 60w짜리 전구는 약 800루멘 정도일 겁니다.
그리고 조명의 부서짐(decay) 정도를 설정하는 decay 속성도 있습니다.
현실적인 조명을 위해서는 2 정도가 적당하죠.

# Cameras

PerspectiveCamera(원근 카메라)입니다. 이 카메라는 멀리 있는 물체를 가까이 있는 것보다
상대적으로 작게 보이도록 해주죠.

PerspectiveCamera는 절두체(frustum)를 만듭니다.
절두체(frustum)는 입체(보통 원뿔이나 각뿔)를 절단하는 하나나 두 평행면 사이의 부분을 의미하죠.
여기서 입체란 정육면체, 원뿔, 구, 원통, 절두체 등의 3D 요소입니다.

PerspectiveCamera는 4가지 속성을 바탕으로 절두체를 만듭니다. near는 절두체가 어디서 시작할지 결정하는 속성이고, far는 절두체의 끝입니다. fov는 시아갹(field of view)으로, near와 카메라의 거리에 따라 절두체의 높이를 계산해 적용합니다. aspect는 절두체의 너비에 관여하는 비율으로, 절두체의 너비는 절두체의 높이에 이 비율을 곱한 값입니다.

OrthographicCamera(정사영 카메라)
절두체 대신 left, right, top, bottom, near, far로 육면체를 정의해 사용하죠.
육면체로 화면을 투사하기에 원근 효과가 없습니다.
Three.js에서 OrthographicCamera는 주로 2D 요소를 표현하기 위해 사용합니다.
카메라에 얼마나 많은 요소를 보여줄지만 결정하면 되죠.
만약 canvas의 1픽셀을 카메라의 한 칸과 같은 크기로 지정하고 싶다면
중점을 장면의 중심에 두고 1 픽셀을 Three.js의 한 칸으로 만들 수 있습니다.

# fog

3D 엔진에서 안개란, 일반적으로 카메라로부터의 거리에 따라 특정 색상으로 점차 변화하는 것을 말합니다. Three.js에서는 Fog나 FogExp2 객체를 생성한 뒤, 장면(scene)의 fog 속성에 지정해 안개를 사용합니다.

Fog는 인자로 near와 far값을 받는데, 이는 카메라로부터의 거리값입니다. near값보다 가까운 공간은 안개의 영향이 전혀 없고, far값보다 먼 공간은 완전히 안개에 뒤덮입니다. near와 far 사이의 공간에 있는 물체 또는 물체의 일부는 점차 안개의 색으로 변화하죠.

FogExp2는 카메라에서 멀어질수록 안개의 강도가 강해집니다.

```
const scene = new THREE.Scene();
{
  const color = 0xFFFFFF;  // 하양
  const near = 10;
  const far = 100;
  scene.fog = new THREE.Fog(color, near, far);

}
{
  const color = 0xFFFFFF;
  const density = 0.1;
  scene.fog = new THREE.FogExp2(color, density);
}
```

# renderTargets

Three.js의 렌더 타겟이란, 직접 렌더링할 수 있는 텍스처(texture)를 말합니다. 한 번 텍스처로 렌더링한 뒤에는 다른 텍스처처럼 사용할 수 있죠.
렌더 타겟의 용도는 무궁무진합니다. 그림자가 렌더 타겟을 사용하고, 피킹(picking)도 렌더 타겟을 사용할 수 있죠. 많은 후처리 효과를 사용할 때 렌더 타겟이 필수 요소인 경우도 있고, 차의 후사경(rear view mirror, 백미러)이나 모니터 화면 등에도 렌더 타겟을 활용할 수 있습니다.

이번 글은 여기까지입니다. 마지막으로 WebGLRenderTarget을 사용할 때의 주의해야 할 점 몇 가지만 살펴보고 끝내도록 하죠.

기본적으로 WebGLRenderTarget은 2개의 텍스처를 생성합니다. 하나는 색상 텍스처이고, 다른 하나는 깊이/스텐실(depth/stencil) 텍스처이죠. 깊이 텍스처나 스텐실 텍스처를 사용하지 않을 거라면 인스턴스 생성 시 옵션을 지정해 텍스처를 아예 생성하지 않도록 할 수 있습니다.

const rt = new THREE.WebGLRenderTarget(width, height, {
depthBuffer: false,
stencilBuffer: false,
});
렌더 타겟의 크기를 바꿔야 한다면

앞선 예제에서는 렌더 타겟을 생성할 때 고정 사이즈, 512x512를 사용했습니다. 하지만 후처리 등에서 렌더 타겟을 사용할 경우, canvas 크기와 렌더 타겟의 크기를 똑같이 설정하는 것이 일반적입니다. 예제를 바탕으로 이를 구현하려면 canvas의 사이즈가 변경되었을 때 카메라와 렌더 타겟의 사이즈를 변경해주어야 하죠.

function render(time) {
time \*= 0.001;

if (resizeRendererToDisplaySize(renderer)) {
const canvas = renderer.domElement;
camera.aspect = canvas.clientWidth / canvas.clientHeight;
camera.updateProjectionMatrix();

    renderTarget.setSize(canvas.width, canvas.height);
    rtCamera.aspect = camera.aspect;
    rtCamera.updateProjectionMatrix();

# BufferGeometry

BufferGeometry는 Three.js 내의 모든 geometry를 나타냅니다(r125에서부터 Geometry가 제거되었습니다). 좀 더 자세히 말하면 특정 BufferAttribute라고 부르는 속성의 집합이죠.

각 BufferAttribute는 위치(positions), 법선(normals), 색(colors), uv 데이터의 배열이고, 이들을 모으면 각 꼭지점에 대한 평행 배열 형식의 데이터가 됩니다.
그림을 보면 총 4개의 속성(attribute), position, normal, color, uv가 있습니다. 이들은 평행 배열로 각 속성의 N 번째 데이터 묶음이 한 꼭지점의 데이터를 나타냅니다. 표시한 index = 4 위치의 꼭지점 데이터를 보세요. 이 묶음이 하나의 꼭지점을 정의합니다.

<br />

# Tips
