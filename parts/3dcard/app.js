// ani
const card = document.querySelector('.card')
const container = document.querySelector('.container')

// items
const title = document.querySelector('.title')
const sneaker = document.querySelector('.sneaker img')
const purchase = document.querySelector('.purchase button')
const desc = document.querySelector('.info h3')
const sizes = document.querySelector('.sizes')

// moving ani event
card.addEventListener('mousemove', (e) => {
    let xAxis = ((window.innerWidth / 2 - e.pageX) /15)
    let yAxis = ((window.innerHeight/ 2 - e.pageY) /15)
    card.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`
})

// ani-in
card.addEventListener('mouseenter', e => {
    card.style.transition = 'none'
    // popout
    title.style.transform = 'translateZ(100px)'
    sneaker.style.transform = 'translateZ(100px) rotateZ(-45deg)'
    purchase.style.transform = 'translateZ(100px)'
    desc.style.transform = 'translateZ(100px)'
    sizes.style.transform = 'translateZ(100px)'
    
})
// ani-out
card.addEventListener('mouseleave', e => {
    card.style.transition= 'all 0.5s ease'
    card.style.transform = 'rotateY(0deg) rotateX(0deg)'
    sneaker.style.transform = 'translateZ(0px) rotateZ(0deg)'
})