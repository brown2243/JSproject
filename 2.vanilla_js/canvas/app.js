window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    // Resizing
    canvas.height = window.innerHeight
    canvas.width  = window.innerWidth

    ctx.fillRect(200,0,200,200) // 사각형
    ctx.strokeStyle = 'red'
    ctx.strokeRect(200,200,200,200)  // 테두리 사각형
    ctx.lineWidth = 5
    ctx.strokeStyle = 'blue'
    ctx.strokeRect(400,200,200,200)  // 테두리 사각형

    ctx.beginPath()     // 시작점
    ctx.moveTo(0,500)   // from
    ctx.lineTo(500,500) // to
    ctx.lineTo(500,550) // to
    ctx.closePath()
    ctx.stroke()

    let painting = false

    function startPosition(e){
        painting = true
        draw(e)
    }
    function finishedPosition(){
        ctx.beginPath()
        painting = false
    }

    function draw(e){
        if(!painting) return
        ctx.lineWidth = 10    // 선 굵기
        ctx.lineCap = 'round' // 선 둥글게 처리

        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY)
    }

    canvas.addEventListener('mousedown',startPosition)
    canvas.addEventListener('mouseup',finishedPosition)
    canvas.addEventListener('mousemove',draw)
})