window.addEventListener('scroll', bgChanger)


function bgChanger(){
     (this.scrollY > this.innerHeight / 1.5) 
        ? document.body.classList.add('bg-active')
        : document.body.classList.remove('bg-active')
}