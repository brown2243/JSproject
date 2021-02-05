const cursor = document.querySelector('.cursor')
const navLinks = document.querySelectorAll('.nav-links li')

window.addEventListener('mousemove', cursorMove)

function cursorMove(e){
    cursor.style.top = e.pageY-15 + 'px'
    cursor.style.left= e.pageX-20 + 'px'
}

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        cursor.classList.add('link-grow')
        link.classList.add('hovered-link')
    })
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('link-grow')
        link.classList.remove('hovered-link')
    })
})