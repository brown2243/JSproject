window.addEventListener('load', () => {
    const sounds = document.querySelectorAll('.sound')
    const pads = document.querySelectorAll('.pads div')
    const visual = document.querySelector('.visual')
    const colors = [
                    '#60d394',
                    '#d36060',
                    '#c060d3',
                    '#d3d160',
                    '#6860d3',
                    '#60b2d3'
                            ]

    pads.forEach((pad,idx) => {
        pad.addEventListener('click', function(){
            sounds[idx].currentTime = 0
            sounds[idx].play()
            createBubbles(idx)
        })
    })

    const createBubbles = (idx) => {
        const bubble = document.createElement('div')
        visual.appendChild(bubble)
        bubble.style.backgroundColor = colors[idx]
        bubble.style.animation = 'jump 1s ease'
    }
})