const list = document.querySelectorAll('.ilbuni')
const ilbuni = document.querySelector('.ilbuni:nth-child(3)')
const stage = document.querySelector('.stage')

// ilbuni.addEventListener('click', () => {
    //     ilbuni.classList.toggle('special')
// })

// list.forEach(v => {
//     v.addEventListener('click', () => {
//         v.classList.toggle('special')
//         // stage.removeChild(v)
        
//     })
// })

// load 는 이미지등을 포함한 모든 dom 요소가 준비되고나서
// DOMContentLoaded dom 태그만 준비되면 실행(효율적)

// const characters = document.querySelector('.characters')
// function clickHander(e){
//     console.log(e.target)
// }
// characters.addEventListener('click', clickHander)

// 이벤트 위임
// 위처럼 반복문으로 addEventlistener 사용하면 엘리먼트가
// 많아지면 성능저하 가능성때문에 이벤트 위임이라는 방법을 사용
// 모든 엘리먼트에 거는게 아니고 상위엘리먼트 하나에 건다.
const menu = document.querySelector('.menu')
// 이렇게 하는 것 보다 이벤트 위임을 해야 성능 향상!
// btns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         console.log(btn)
//     })
// })

menu.addEventListener('click', (e) => {
    // console.log(e.target.getAttribute('data-value'))
    let elem = e.target
    while (!elem.classList.contains('menu-btn')){
        elem = elem.parentNode
        if (elem.nodeName === 'BODY'){
            return
        }
    }
    console.log(elem.dataset.value)
})