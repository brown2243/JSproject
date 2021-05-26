## 일반

#### 짝수와 홀수

```
function solution(num) {
    return num % 2 === 0 ? "Even" : "Odd"
}
```

#### 최대공약수와 최소공배수

```
function solution(n, m){
    return [GCD(n,m), n*m / GCD(n,m)]
}
const GCD = (n,m) => {
    if(m === 0) return n
    return GCD(m, n % m)
}
```

#### 콜라츠 추측

```
function solution(num) {
    let cnt = 0
    while(cnt < 500 && num !== 1){
        if(num % 2 === 0) num = num / 2
        else num = num * 3 + 1
        cnt++
    }
    return cnt === 500 ? -1 : cnt
}
```

#### 평균 구하기

```
function solution(arr) {
    return arr.reduce((acc,cur) => acc+cur) / arr.length
}
```

#### 하샤드 수

```
function solution(x) {
    const N = String(x).split("").reduce((acc, cur) => Number(acc) + Number(cur))
    return (x % N === 0)
}
```

#### 핸드폰 번호 가리기

```
function solution(phone_number) {
    return phone_number.split("").fill("*", 0, -4).join("")
}
```

#### 행렬의 덧셈

```
function solution(arr1, arr2) {
    for(let i = 0; i < arr1.length; i++){
        for(let j = 0; j < arr1[0].length; j++){
            arr1[i][j] += arr2[i][j]
        }
    }
    return arr1
}
```

#### x만큼 간격이 있는 n개의 숫자

```
function solution(x, n) {
    return Array.from({length:n}, ((val, idx) => (idx + 1) * x))
}
```

#### 직사각형 별찍기

```
process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const [n, m] = data.split(" ")
    for(let i = 0; i < m; i++){
        console.log("*".repeat(n))
    }
});
```

#### 같은 숫자는 싫어

```
function solution(arr)
{
    return arr.filter((v, i) => v !== arr[i-1])
}
```

#### 나누어 떨어지는 숫자 배열

```
function solution(arr, d) {
    const ans = arr.filter(v => v % d === 0).sort((a, b) => a - b)
    return ans.length === 0 ? [-1] : ans
}
```

#### 두 정수 사이의 합

```
function solution(a, b, s = 0) {
    const big = Math.max(a,b), small = Math.min(a,b)
    let ans = 0
    for(let i = small; i <= big; i++){
        ans += i
    }
    return ans
}
```

#### 문자열 내 마음대로 정렬하기

```
function solution(strings, n) {
    return strings.map(v => v[n]+v).sort().map(v => v.substring(1))
}
```

#### 문자열 내 p와 y의 개수

```
function solution(s){
    s = s.toUpperCase().split("")
    const P = s.filter(v => v === "P")
    const Y = s.filter(v => v === "Y")
    return P.length === Y.length
}
```

#### 문자열 내림차순으로 배치하기

```
function solution(s) {
    return s.split("").sort().reverse().join("")
}
```

#### 문자열 다루기 기본

```
function solution(s) {
    if(s.length === 4 || s.length === 6){
        if(Number.isInteger(Number(s))) return true
    }
    return false
}
```

#### 서울에서 김서방 찾기

```
function solution(seoul) {
    return `김서방은 ${seoul.indexOf("Kim")}에 있다`
}
```

#### 소수 찾기

```
function solution(n) {
    const dp = new Array(n+1).fill(true).fill(false, 0, 2)
    for(let i = 2; i < n ** 0.5 + 1; i++){
        if(dp[i]){
            for(let j = i*2; j <= n; j += i){
                dp[j] = false
            }
        }
    }
    return dp.filter(x => x === true).length
}
```

#### 수박수박수박수박수박수?

```
function solution(n) {
    return "수박".repeat(Math.ceil(n/2)).substring(0,n)
}
```

#### 문자열을 정수로 바꾸기

```
function solution(s) {
    return Number(s)
}
```

#### 시저 암호

```
function solution(s, n) {
   var chars = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXY                          "
    return s.split('').map(e => chars[chars.indexOf(e)+n]).join('');
}
```

#### 약수의 합

```
function solution(n) {
    let total = 0
    for(let i = 1; i <= n; i++){
        if(n % i === 0) total += i
    }
    return total
}
```

#### 제일 작은 수 제거하기

```
function solution(arr) {
    arr.splice(arr.indexOf(Math.min(...arr)),1)
    return arr.length !== 0 ? arr : [-1]
}
```

#### 정수 제곱근 판별

```
function solution(n) {
    return Number(n ** 0.5) === parseInt(n ** 0.5) ? (n ** 0.5 + 1)** 2 : -1
}
```

#### 정수 내림차순으로 배치하기

```
function solution(n) {
    return Number(String(n).split("").sort((a,b) => b-a).join(""))
}
```

#### 자연수 뒤집어 배열로 만들기

```
function solution(n) {
    return String(n).split("").reverse().map(v => Number(v))
}
```

#### 자릿수 더하기

```
function solution(n)
{
    return String(n).split("").reduce((acc,cur) => acc + Number(cur), 0)
}
```

#### 이상한 문자 만들기

```
function solution(s){
    return s.split(' ')
            .map(v => v.split('')
                 .map((val, key) => key % 2 === 0 ? val.toUpperCase() : val.toLowerCase())
                 .join(''))
            .join(' ')
}
```

#### 약수의 합

```
function solution(n) {
    let total = 0
    for(let i = 1; i <= n; i++){
        if(n % i === 0) total += i
    }
    return total
}
```

#### 체육복

```
function solution(n, a1, a2) {
    const arr1 = a1.filter(x => (!a2.includes(x))).sort((a,b) => a - b)
    const arr2 = a2.filter(x => (!a1.includes(x))).sort((a,b) => a - b)

    for(let i = 0; i < arr2.length; i++){
        if(arr1.includes(arr2[i]-1)){
            arr1.splice(arr1.indexOf(arr2[i]-1),1)
        }
        else if(arr1.includes(arr2[i]+1)){
            arr1.splice(arr1.indexOf(arr2[i]+1),1)
        }
    }
    return n - arr1.length
}
```

#### 완주하지 못한 선수

```
const solution = (arr1,arr2) => {
    arr1.sort()
    arr2.sort()
    for(let i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i]){
            return arr1[i]
        }
    }
}
```

#### 내적

```
function solution(a, b) {
    return a.reduce((acc, cur, idx) => acc + cur * b[idx], 0)
}
```

#### 모의고사

```
function solution(arr) {
    const p1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    const p2 = [2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5]
    const p3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    const ans = [0,0,0,0]
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === p1[i % p1.length]) ans[1] += 1
        if(arr[i] === p2[i % p2.length]) ans[2] += 1
        if(arr[i] === p3[i % p3.length]) ans[3] += 1
    }
    const max = Math.max(...ans)
    return ans.map((val, idx) => {
        if(val === max){
            return idx
        }
    }).filter(x => x != null)
}
```

#### 폰켓몬

```
function solution(nums) {
    const obj = {}
    for(let val of nums){
         obj[val] = obj[val] ? obj[val] + 1 : 1
    }
    return Math.min(nums.length / 2, Object.keys(obj).length)
}
```

#### 소수 만들기

```
function solution(nums) {
    let cnt = 0
    for(let i = 0; i < nums.length; i++){
        for(let j = i+1; j < nums.length; j++){
            for(let z = j+1; z < nums.length; z++){
                let num = nums[i]+ nums[j] + nums[z]
                if(isPrime(num)) cnt++
            }
        }
    }
    return cnt
}
const isPrime = (a) =>{
    for(let i = 2; i < a; i++){
        if(a % i === 0){
            return false
        }
    }
    return true
}
```

#### K번째수

```
function solution(array, commands) {
    const ans = []
    for(let [a,b,c] of commands){
        let tmp = array.slice(a - 1, b).sort((i, j) => i - j)
        ans.push(tmp[c-1])
    }
    return ans
}
```

#### 예산

```
function solution(d, b) {
    let cnt = 0 ,total = 0
    d.sort((a,b) => a - b)
    for(let i = 0; i < d.length; i++){
        if(total + d[i]  <= b){
            total += d[i]
            cnt++
        } else break
    }
    return cnt
}
```

#### 3진법 뒤집기

```
function solution(n) {
    return parseInt(
           n.toString(3)
            .split("")
            .reverse()
            .join(""), 3)
}
```

#### 두 개 뽑아서 더하기

```
function solution(numbers) {
    const ans = []
    numbers.forEach((v1,i1) => {
        numbers.forEach((v2,i2) => {
            if(i1 !== i2){
                ans.push(v1 + v2)
            }
        })
    })

  return ans.sort((a,b) => a-b).filter((v,i) => {
        if(v === ans[i+1]) {
            return false
        } else {
            return true
        }
    })
}
```

#### 2016년

```
function solution(a, b) {
    const date = new Date(2016, (a - 1), b)
    return date.toString(3).substring(0,3).toUpperCase()
}
```

#### 가운데 글자 가져오기

```
function solution(s) {
    return s.length % 2 === 1 ? s.substr(Math.floor(s.length / 2),1) : s.substr(Math.floor(s.length / 2)-1,2)
}
```

####

```

```

####

```

```

####

```

```

## 카카오
