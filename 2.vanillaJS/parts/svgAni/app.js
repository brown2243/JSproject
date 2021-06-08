const logo = document.querySelectorAll('#logo path')
console.log(logo)
for (let i = 0; i <logo.length; i++) {
    console.log(`letter ${i} is ${logo[i].getTotalLength()}`)
}

// 핵심
// pigma홈페이지 stroke에서 center
// getTotalLength()로 거리구하기
