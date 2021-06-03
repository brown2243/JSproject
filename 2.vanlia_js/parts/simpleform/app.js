function animatedForm() {
    const arrows = document.querySelectorAll('.fa-arrow-down')

    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const input = arrow.previousElementSibling // arrow의 input태그 
            const parent= arrow.parentElement // arrow의 전체 div태그
            const nextForm = parent.nextElementSibling // 다음 전체 div 태그
            
            // console.log(input, parent, nextForm)

            if (input.type === 'text' && validateUser(input) ||
               (input.type === 'email' && validateEmail(input)) ||
               (input.type === 'password' && validateUser(input))) {
                nextSlide(parent, nextForm)
            }
            else parent.style.animation = 'shake 0.5s ease'
            
            // 애니메이션 초기화 시켜서 반복할 수 있게 해줌.
            parent.addEventListener('animationend', () => {
                parent.style.animation = ''
            })

        })
    })
}

function nextSlide(parent, nextForm) {
    parent.classList.add('inactive')
    parent.classList.remove('active')
    nextForm.classList.add('active')
    nextForm.classList.remove('inactive')
}

function validateUser(user){
    if(user.value.length < 6) {
        console.log('not enough characters')
        checkError('rgb(189,87,87)')
    } else {
        checkError('rgb(87,189,130)')
        return true
    }
}

function validateEmail (email) {
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (validation.test(email.value)) {
        checkError('rgb(87,189,130)')
        return true
    } else {
        checkError('rgb(189,87,87)')
        return false
    }
}

function checkError(color) {
    document.body.style.backgroundColor = color
}

animatedForm()