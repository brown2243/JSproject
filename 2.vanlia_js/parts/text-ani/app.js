const text = document.querySelector('.fancy')
const strText = text.textContent.split('')
text.textContent= ''

strText.forEach((v) => text.innerHTML += `<span>${v}</span>`)

let char = 0
let timer= setInterval(onTick, 50)

function onTick(){
    const span = text.querySelectorAll('span')[char]
    span.classList.add('fade')
    char++
    if(char === strText.length){
        complete()
        return
    }
}

function complete(){
    clearInterval(timer)
    timer = null
}