const navSlide = () => {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav-links')
    const navLinks = document.querySelectorAll('.nav-links li')

    burger.addEventListener('click', () => {
        // toggle
        nav.classList.toggle('nav-active')
        
        //Animation Links
        navLinks.forEach((link,idx) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${idx/7+0.2}s`
            }
        })
        
        //Burger Animation
        burger.classList.toggle('toggle')
    })
 
}

navSlide()