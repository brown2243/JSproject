# 인터렉티브 웹 개발 제대로 시작하기

강의 링크 : https://www.inflearn.com/course/interactive_web/dashboard

## 수강 이유

인터렉티브 웹 개발에 흥미가 생겨서

### 1. CSS Transform ans Animation

```
    transition: all 0.5s ease; // 모션종류, 시간, 타이밍, 딜레이

    transform: scale(2); //rotate(45deg);
    transform: skew(180deg);
    transform: translate(100px, 100px);
    transform-origin: 100% 100%; // 기준점을 바꿔줌(원래는 중간) ,x축, y축

    animation: sample 2s linear 2 forwards; // 이름 시간 속성 두번..
    forwards 끝난자리에서 멈춤
    infinite 무한
    alternate 반복
    reverse 거꾸로
```

frame by frame는 애니메이션 장면 장면별로 하나씩 그려서 만드는 애니메이션기법.
이미지 스프라이트를 써야함.

예시 코드

```
.spaceship {
  background: url(./img/sprite_spaceship.png) no-repeat 0 0 / cover; // auto 150px;
  //  / 다음 백그라운드 크기(/ width height) 계산이 쉬운면만 바로 만들고 반대쪽은 auto
  // 지금은 cover쓰면 된다함
  animation: spaceshipMove 2s steps(17) infinite;
}
@keyframes spaceshipMove {
  to {
    background-position: -2550px 0; // 이미지 0부터
  }
}
```

step을 넣어주어야 장면 장면씩 넘어가며 깔끔하게 보여짐

---

### 2. CSS 3D

1. 상위 엘리먼트 속성에 perspective 값을 주어야 한다.(시점을 제공)
2. 위치에 상관없이 3D 효과를 주고 싶으면 개별 엘리먼트에 시점을 넣을 수 있다.

```
.world {
    perspective: 100px; // 1번
    .card {
        transform: perspective(500px) rotateY(45deg); // 2번
    }
}
```

3d 카드 효과를 만드려면 앞면, 뒷면을 만들어서 겹치고 backface-visibility: hidden 값을 넣어주면 된다.

```
HTML

<div class="card">
    <div class="front">앞</div>
    <div class="back">뒤</div>
</div>

CSS

.front,
    .back {
      position: absolute;
      backface-visibility: hidden;
    }
    .front {
      z-index: 1;
    }
    .back {
      transform: rotateY(180deg);
    }
```

### 3. Dom - scripts

DOM = document object model
html 태그들이 Js object로 변환되서 js로 조작을 할 수 있게 됌.

```
document.querySelector
document.querySelectorAll
setAttribute(key, value)
getAttribute(key) = value
document.createElement('태그')
엘리먼트.innerHtml = 'html 내용'
엘리먼트.getContent = '태그 내용'
엘리먼트.appendChild(pEle);
엘리먼트.removeChild(pEle);
엘리먼트.classList.add("special");
엘리먼트.classList.remove("special");
엘리먼트.classList.toggle("special"); ...
```

data 형식은 html5 표준커스텀속성이다.
data-index,data-id등 data- 의 형식으로 속성을 추가할 수 있음.

```
엘리먼트.setAttribute('data-id', 123)
```

---

### 4. Event - scripts

addEventListener로 사용

```
엘리먼트.addEventListener(type, function, option)
```

3번째 인자인 option은 거의 활용하지 않기에 대부분 생략 된다.

type은 이벤트 속성(click, mousemove, load...)이다.
해당되는 이벤트 속성이 발생했을 때 function 작동

type 속성중에 load는 문서의 모든 resource가 준비될 때까지 기다리기 때문에
주로 DONContentLoaded가 사용 된다.

function은 첫번째 인자로 이벤트 객체를 받아온다.

엘리먼트에 이벤트를 적용 시키려면 엘리먼트를 가져와서

```
const ilbuni = document.querySelector('.ilbuni:nth-child(3)') // 1.단일
const list = document.querySelectorAll('.ilbuni') // 2. 리스트
const stage = document.querySelector('.stage')  // 3. 이벤트 위임
```

이벤트를 걸어준다.

```
// 1. 단일
ilbuni.addEventListener('click', () => {
    ilbuni.classList.toggle('special')
})

// 2. 리스트 안에 있는 엘리먼트에 개별적으로 걸어줌
list.forEach(v => {
    v.addEventListener('click', () => {
    v.classList.toggle('special')
    })
})

// 3. 상위 엘리먼트에 클릭 이벤트를 건 후 하위 엘리먼트를 클릭하면
//    클릭 된 하위 엘리먼트의 부모노드에서 클릭 된 자식노드를 삭제
//    모든 하위요소가 삭제될 수 있는 상황을 방지하기 위해 class 체크
stage.addEventListener('click', function(e){
    if(e.target.classList.contains(".ilbuni")){
        this.parentNode.removeChild(this)
    }
})

```

개별적으로 이벤트를 거는 것보다, 이벤트 위임 기법을 활용하는 것이 효율적이다.

---

### 5. Scroll_Event - scripts

스크롤 이벤트는 정말 많이 쓰인다.

```
window.addEventListener('scroll', function(){

})
주로 쓰이는 속성들은
Window.innerWidth / Window.innerHeight
메뉴바, 툴바 제외한 안쪽 창 영역의 높이와 너비

Window.outerWidth / Window.outerHeight
메뉴바, 툴바 모두 포함한 전체 창 영역의 높이와 너비

Window.pageXOffset / Window.pageYOffset
전체 컨텐츠를 얼마나 스크롤했는가에 대한 값

window.scrollX / window.scrollY
위와 동일

window.pageYOffset = 얼마만큼 스크롤 했는지(0부터 시작)

window.pageXOffset = X축 스크롤 값(0부터 시작)

window.innerHeight = 화면 길이 값

엘리먼트.getBoundingClientRect() 메써드는 위치 객체를 반환한다.

엘리먼트.getBoundingClientRect().top
엘리먼트.getBoundingClientRect().bottom
엘리먼트.getBoundingClientRect().left
엘리먼트.getBoundingClientRect().right
엘리먼트.getBoundingClientRect().height
엘리먼트.getBoundingClientRect().width
엘리먼트.getBoundingClientRect().x
엘리먼트.getBoundingClientRect().y
```

---

### 6. Transition / Animation Event EX

- Transition EX

```
    const ballElem = document.querySelector(".ball");

    window.addEventListener("click", function (e) {
        ballElem.style.transform = `translate(${e.clientX - 15}px,
                                              ${e.clientY - 15}px)`;
    });

    ballElem.addEventListener("transitionend", function (e) {
        ballElem.classList.toggle("end");
    });
```

- Animation EX

```
    const ballElem = document.querySelector('.ball');

    window.addEventListener('click', function (e) {
        ballElem.style.animation = 'ball-ani 1s 3 forwards';
    });

    ballElem.addEventListener('animationend', function (e) {
        ballElem.classList.add('end');
    });
    // 반복이 될 때
    ballElem.addEventListener('animationiteration', function (e) {
        console.log('반복!');
    });
```

---

### 7. 타이밍 조절하기

- setTimeout

  ```
  {
    setTimeout(function, time)
    setTimeout(function(){
        console.log('settimeout')
    }, 1000) // 1초 뒤 settimeout 출력 됨
  }
  {
    let timeid
    function sample(){
        console.log('sample')
    }
    timeid = setTimeout(sample, 3000) // 3초 뒤에 sample 함수 실행
    clearTimeout(timeid) // timeid에 저장된 settimeout이 취소 됨
  }
  ```

- setInterval
  해제를 시키지 않으면 메모리를 계속 차지한다.

  ```
  {
    setInterval(function, time)
    setInterval(function(){
        console.log('setInterval')
    }, 1000) // 1초 마다 setInterval 출력 됨

    const timeid = setInterval(function, 3000)
    clearInterval(timeid) // timeid에 저장된 setInterval 취소 됨
  }
  ```

- requestAnimationFrame
  초고속 반복 실행을 위해 만들어진 함수(애니메이션, 렌더링 같은 목적)
  Three.js에서도 많이 씀

  ```
    requestAnimationFrame(함수)
  ```

---

### 8. 최종 예제

전진 3D 스크롤!
8.practice_3dscroll 폴더

---
