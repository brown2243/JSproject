const texts = ['websites', 'illustrations', 'pancakes']
let cnt = 0
let idx = 0
let curText = ''
let letter = ''

function type() {
    if (cnt === texts.length) cnt = 0
    
    curText = texts[cnt]
    letter  = curText.slice(0, ++idx)

    document.querySelector('.typing').textContent = letter
    if (letter.length === curText.length) {
        cnt++
        idx = 0
    }
    setTimeout(type, 400)

};
type()