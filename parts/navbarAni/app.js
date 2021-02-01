function santaNav(){
    const sections = document.querySelectorAll('section')
    const navLink =  document.querySelectorAll('nav a')

    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            const id = section.getAttribute('id')
            document.querySelector(`a[href='#${id}']`).classList.add('active')
        })
        section.addEventListener('mouseleave', () => {
            const id = section.getAttribute('id')
            document.querySelector(`a[href='#${id}']`).classList.remove('active')
        })
    })
}
santaNav()