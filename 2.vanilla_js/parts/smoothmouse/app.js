function smoothScroll(val, duration) {
    const target = document.querySelector(val)
    const targetPosition = target.getBoundingClientRect().top
    //  + window.scrollY
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    console.log(startPosition, targetPosition)

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * ( t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation)
}
const section1 = document.querySelector('.sections1')
const section2 = document.querySelector('.sections2')

section1.addEventListener('click', () => {
    smoothScroll('.sections2', 1500)
})
section2.addEventListener('click', () => {
    smoothScroll('.sections1', 1500)
})