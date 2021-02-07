// document object model
// html 태그들이 Js object로 변환되서 js로 조작을 할 수 있게 됌
// data 형식 (data-index,data-id...)등은 html5 표준커스텀속성이다.

// document.querySelector
// document.querySelectorAll
// setAttribute(key, value)
// getAttribute(key) = value
// document.createElement('태그')
// 태그.innerHtml = 'html 내용'
// 태그.getContent

const characters = document.querySelector('.characters')
const pEle = document.createElement('p')
pEle.innerHTML = '<span>Hey</span>'
characters.appendChild(pEle)
characters.removeChild(pEle)
characters.removeChild(document.querySelector('.b'))

const first = document.querySelector('.ilbuni')
first.classList.toggle('special')