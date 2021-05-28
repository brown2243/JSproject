## 일반

#### 예상 대진표

```
function solution(n,a,b)
{
    let ans = 0
    while(a !== b){
        ans++
        a = Math.ceil(a/2)
        b = Math.ceil(b/2)
    }
    return ans
}
```

#### 프린터

```
function solution(priorities, location) {
    let cnt = 0
    let max = Math.max(...priorities)
    while(true){
        if(priorities[0] === max){
            if(location === 0){
                return ++cnt
            }
            else {
                priorities.shift()
                max = Math.max(...priorities)
                location--
                cnt++
            }
        }
        else {
            priorities.push(priorities.shift())
            if(location === 0) location = priorities.length - 1
            else location--
        }
    }
}
```

#### 게임 맵 최단거리

```
function solution(maps) {
    const start = [0,0], N = maps.length-1, M = maps[0].length-1
    const target = [N, M]
    const dx = [1,-1 ,0,0]
    const dy = [0, 0,-1,1]

    const dfs = (x,y) => {
        const q = [[x,y]]
        while(q.length > 0){
            const [x,y] = q.shift()
            for(let i = 0; i < 4; i++){
                const tx = x + dx[i]
                const ty = y + dy[i]
                if((0 <= tx && tx <= N) && (0 <= ty && ty <= M)){
                    if(maps[tx][ty] === 1){
                        maps[tx][ty] = maps[x][y] + 1
                        q.push([tx, ty])
                    }
                }
            }
        }
       return maps[N][M]
    }
    dfs(0,0)
    return maps[N][M] !== 1 ? maps[N][M] : -1
}
```

#### 소수 찾기

```
function solution(numbers) {
    // 순열 구하기
    const string = numbers.split(""), N = string.length, set = new Set()

    const permutation = (arr, k, list) => {
        if (list.length === k) {
            set.add(list.join(''))
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            const nextArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
            permutation(nextArr, k, [...list, arr[i]]);
        }
    }

    for(let i = 1; i <= N; i++){
        permutation(string, i, [])
    }
    const ans = Array.from(set)

    // 소수 구하기
    const max = Math.max(...ans), Prime = new Array(max+1).fill(true).fill(false, 0, 2)
    for(let i = 2; i < Math.ceil(max ** 0.5); i++){
        if(Prime[i]){
            for(let j = i * 2; j <= max; j += i){
                Prime[j] = false
            }
        }
    }
    // 정답 구하기
    return ans.filter(v => Prime[v]).length
}
```

#### 조이스틱

이거는 문제가 좀 이상했던 걸로 기억.

```
function solution(name) {
    const arr = [0];

    const answer = [...name].reduce((acc, cur, i)=>{
        if(cur === "A"){
            if(name[i-1]!= "A") {
                arr.push(continuous(name.substring(i))-(i-1));
            }
            console.log(arr)
            return acc + 1;
        }
        return acc + ascii(name, i) + 1;
    }, 0);

    return answer - Math.max(...arr) -1;
}

function ascii(name, i){
    const num = name.charCodeAt(i);
    return (num > 78)? 91 - num : num - 65;
}

function continuous(name){
    let repeat = 0;
    for(let i = 0; i < name.length; i++){
        if(name[i] != "A") break;
        repeat++;
    }
    return repeat;
}
```

#### 가장 큰 수

```
function solution(numbers) {
    let ans = numbers.sort((a, b) => `${b}${a}`-`${a}${b}`).join("")
    return ans[0] === '0' ? '0' : ans
}
```

#### 짝지어 제거하기

```
function solution(s){
    s = s.split('')
    const box = []
    for(let i = 0; i < s.length; i++){
        if (box[box.length-1] === s[i]) box.pop()
        else box.push(s[i])
    }
    return box.length === 0 ? 1 : 0
}
```

#### 타겟 넘버

```
function solution(numbers, target){
    let ans = 0
    const solve = (sum, idx) => {
        if(idx === numbers.length){
            if(sum === target){
                ans++
                return
            }
            return
        }
        else {
            solve(sum + numbers[idx], idx+1)
            solve(sum - numbers[idx], idx+1)
        }
    }
    solve(0, 0)
    return ans
}
```

#### 기능개발

```
function solution(pro, speeds) {
    const ans = []
    while(pro.length > 0){
        for(let i = 0; i < pro.length; i++){
            pro[i] += speeds[i]
        }

        let cnt = 0
        while(pro[0] >= 100){
            pro.shift()
            speeds.shift()
            cnt++
        }
        if(cnt > 0) ans.push(cnt)
    }
    return ans
}
```

#### 멀쩡한 사각형

```
function solution(w, h) {
    return w * h - (w + h - GCD(w, h));
}
const GCD = (a, b) => {
    return b ? GCD(b, a%b) : a
}
// answer = (가로 * 세로) - (w + h - gcd)
```

#### 124 나라의 숫자

```
function solution(n) {
    return n === 0 ? '' : solution(parseInt((n - 1) / 3)) + [1, 2, 4][(n - 1) % 3];
}
```

#### 타겟 넘버

```
function solution(numbers, target){
    let ans = 0
    const solve = (sum, idx) => {
        if(idx === numbers.length){
            if(sum === target){
                ans++
                return
            }
            return
        }
        else {
            solve(sum + numbers[idx], idx+1)
            solve(sum - numbers[idx], idx+1)
        }
    }
    solve(0, 0)
    return ans
}
```

#### 가장 큰 정사각형 찾기

어려웠던 문제

```
function solution(board)
{
    const x = board.length
    const y = board[0].length

    let max = 0
    for(let i = 1; i < x; i++){
        for(let j = 1; j < y; j++){
            if(board[i][j] >= 1){
                board[i][j] = Math.min(board[i-1][j], board[i][j-1], board[i-1][j-1]) + 1
                max = Math.max(max, board[i][j])
            }
        }
    }
    console.log(board)
    return max**2
}
```

#### 쿼드압축 후 개수 세기

```
function solution(arr) {
    const ans = [0,0]
    const solve = (x, y, size) => {
        let start = arr[x][y]
        for(let i = x; i < x + size; i++){
            for(let j = y; j < y + size; j++){
                if(arr[i][j] !== start){
                    solve(x           , y            , size / 2)
                    solve(x           , y + size / 2 , size / 2)
                    solve(x + size / 2, y            , size / 2)
                    solve(x + size / 2, y + size / 2 , size / 2)
                    return
                }
            }
        }
        ans[start] += 1
        return
    }
    solve(0, 0, arr.length)
    return ans
}
```

#### 방문 길이

어려운 문제 (지난 번에 해설보고 푼듯)

```
function solution(dirs) {
    const ansObj={}
    let curx = 0, cury = 0
    for (let i = 0; i < dirs.length; i++) {
        let nexx = curx, nexy = cury, key = 'key'
        if(dirs[i] === 'U') {
            nexy = cury + 1
            key = key+curx+cury+nexx+nexy
        }
        if(dirs[i] === 'R') {
            nexx = curx + 1
            key = key+curx+cury+nexx+nexy
        }
        if(dirs[i] === 'D') {
            nexy = cury - 1
            key = key+nexx+nexy+curx+cury
        }
        if(dirs[i] === 'L') {
            nexx = curx - 1
            key = key+nexx+nexy+curx+cury
        }
        if (nexx < -5 || nexx > 5 || nexy < -5 || nexy > 5) {
            continue
        } else {
            ansObj[key] = 1
            curx = nexx
            cury = nexy
        }
    }
    console.log(ansObj)
    return Object.keys(ansObj).length
}
```

#### 스킬트리

```
function solution(skill, skill_trees) {
    skill = skill.split("")
    skill_trees = skill_trees.map(v => v.split("").map(v => skill.includes(v) ? v : '').filter(v => v.length > 0))
    let cnt = skill_trees.length
    console.log(skill_trees)
    for(let i = 0; i < skill_trees.length; i++){
        for(let j = 0; j < skill_trees[i].length; j++){
            if(skill_trees[i][j] != skill[j]){
                cnt--
                break
            }
        }
    }
    return cnt
}
```

#### 이진 변환 반복하기

```
function solution(s) {
    const ans = [0,0];
    let cnt = 0
    while(s !== "1"){
        ans[0] += 1
        s = s.split("").filter(val => {
            if(val === "0"){
                ans[1] +=1
                return false
            }
            return true
        }).join("").length.toString(2)
    }
    return ans
}
```

#### 점프와 순간 이동

예전에 처음 풀 때 DP 적용하고 온갖 짓 다했던 문제.
뒤에서 푸는 굉장히 간단한 방법이 있었던...

```
function solution(n)
{
    let cnt = 0
    while(n !== 0){
        if(n % 2 === 0) n = n / 2
        else {
            n = n -1
            cnt++
        }
    }
    return cnt
}
```

#### 영어 끝말잇기

```
function solution(n, words) {
    const saidword = [words[0]]

    for(let i = 1; i < words.length; i++){
        let lastWord = saidword[saidword.length-1]
        let curWord = words[i]
        console.log(lastWord)
        if(saidword.includes(curWord) || curWord[0] !== lastWord[lastWord.length-1]){
            return [(i % n) + 1 , Math.floor(i/n) + 1]
        }
        saidword.push(curWord)
    }
    return [0,0]
}
```

#### 구명보트

```
function solution(people, limit) {
    const wait = people.sort((a, b) => b - a)
    let cnt = 0
    for(let big = 0, small = wait.length-1; big <= small; big++){
        cnt++
        if(wait[big] + wait[small] <= limit) {
            small--
        }
    }
    return cnt
}
```

#### 삼각 달팽이

엄청 어려운 문제. 풀이 봤었고, 지금도 솔직히 그냥 보면 못풀듯

```
function solution(n) {
    const ans = Array.from({length:n}, ((_, idx) => new Array(idx+1).fill(0)))
    let startRow = 0, endRow = n-1, startCol = 0, endCol = n-1, cnt = 1, Counter = 1
    while(startRow <= endRow && startCol <= endCol){
        // 세로
        for(let i = startRow; i <= endRow; i++){
            ans[i][startCol] = Counter++
        }
        startRow++
        startCol++
        // 가로
        for(let i = startCol; i <= endCol; i++){
            ans[endRow][i] = Counter++
        }
        endRow--
        endCol--
        // 대각선
        for(let i = endRow; i >= startRow; i--){
            ans[i][ans[i].length - cnt] = Counter++
        }
        endCol--
        startRow++
        cnt++
    }
    return ans.flat()
}
// 1
// 2 12
// 3 13 11
// 4 14 15 10
// 5  6  7  8  9
```

#### 큰 수 만들기

```
function solution(number, k) {
    const arr = number.split(""), ans = []
    for(let i = 0; i < arr.length; i++){
        while(arr[i] > ans[ans.length-1] && k > 0){
            ans.pop()
            k--
        }
        ans.push(arr[i])
    }
    ans.splice(ans.length-k, k)
    return ans.join("")
}
```

#### H-Index

```
function solution(arr) {
     arr = arr.sort((a, b) => b - a);
     let i = 0;
     while(i + 1 <= arr[i]){
         i++;
     }
     return i;
}
```

#### 다리를 지나는 트럭

```
function solution(bridge_length, limit, trucks) {
    const bridge = new Array(bridge_length).fill(0)
    let time = 0, weightSum = 0

    while(trucks.length > 0){
        const truck = trucks.shift()
            weightSum -= bridge.shift()
        bridge.push(truck)
        weightSum += truck
        time += 1
        while(weightSum > limit){
            if(bridge[0] !== 0){
                weightSum -= bridge[0]
            }
            bridge.shift()
            bridge.push(0)
            time += 1
        }
    }
    return time + bridge_length
}
```

#### 배달

```
function solution(N, road, K) {
  let adj = Array.from(Array(N + 1), () => new Array(N + 1).fill(Infinity));
  let answer = 0;

  for (let i = 1; i <= N; i++) {
    adj[i][i] = 0;
  }

  road.forEach((r) => {
    const [s, e, dist] = r;
    // 중복 제거
    if (adj[s][e] !== Infinity) {
      adj[s][e] = adj[e][s] = Math.min(adj[s][e], dist);
    } else {
      adj[s][e] = adj[e][s] = dist;
    }
  });

  // 와샬 알고리즘
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (adj[i][k] + adj[k][j] < adj[i][j]) {
          adj[i][j] = adj[i][k] + adj[k][j];
        }
      }
    }
  }
  for (let i = 1; i <= N; i++) {
    if (adj[1][i] <= K) answer++;
  }

  return answer;
}
```

#### 카펫

```
function solution(brown, yellow) {
    const N = brown + yellow
    let tmp = N ** 0.5
    if(Number.isInteger(tmp)){
        return [tmp,tmp]
    } else {
        let a = Math.ceil(tmp)
        while(true){
            if(N % a === 0 && brown === (a * 2 + ((N / a) - 2) * 2)){
                return [a, N/a]
            } else {
                a++
            }
        }
    }
}
```

#### 위장

```
function solution(clothes) {
    const obj = {}
    for(let [name, sort] of clothes){
        obj[sort] = obj[sort] ? obj[sort] + 1 : 1;
    }
    console.log(Object.entries(obj))
    return Object.values(obj).reduce((acc,cur) => acc * (cur + 1), 1) - 1
}
```

#### 올바른 괄호

```
function solution(s){
    s.split("")
    const box = []
    for(let i = 0; i < s.length; i++){
        if(s[i] === '(') box.push(s[i])
        else {
            if(box.length === 0) return false
            else box.pop()
        }
    }
    return box.length === 0 ? true : false
}
```

#### 다음 큰 숫자

```
function solution(n) {
    const N = n.toString(2).split("").filter(v => v === '1').length
    let i = n + 1
    while(true){
        if(N === i.toString(2).split("").filter(v => v === '1').length) return i
        i++
    }
}
```

#### 땅따먹기

```
function solution(land) {
    for(let i = 1; i < land.length; i++){
        for(let j = 0; j < 4; j++){
            let tmp = land[i-1].filter((val, idx) => idx !== j ? val : 0)
            land[i][j] += Math.max(...tmp)
        }
    }
    return Math.max(...land[land.length-1])
}
```

#### 숫자의 표현

```
function solution(n) {
    let cnt = 1
    for(let i = 0; i < n; i++){
        let total = 0
        for(let j = i + 1; j < n; j++){
            total += j
            if(total === n){
                cnt++
                break
            }
            if(total > n){
                break
            }
        }
    }
    return cnt
}
```

#### 최댓값과 최솟값

```
function solution(s) {
    s = s.split(" ").map(v => Number(v))
    return `${Math.min(...s)} ${Math.max(...s)}`
}
```

#### 최솟값 만들기

```
function solution(A,B){
    A.sort((a,b) => a-b)
    B.sort((a,b) => b-a)
    return A.reduce((acc,cur,idx) => acc + cur*B[idx], 0)
}
```

#### 피보나치 수

```
function solution(n) {
    const dp = [0,1,1]
    for(let i = 3; i <= n; i++){
        dp.push((dp[i-1] + dp[i-2]) % 1234567)
    }
    return dp[n]
}
```

#### 행렬의 곱셈

은근히 헷갈림

```
function solution(arr1, arr2) {
    const ans = Array.from({length:arr1.length}, () => new Array(arr2[0].length).fill(0))
    for(let N = 0; N < arr1.length; N++){
        for(let K = 0; K < arr2[0].length; K++){
            for(let M = 0; M < arr1[0].length; M++){
                ans[N][K] += arr1[N][M] * arr2[M][K]
            }
        }
    }
    return ans
}
// N x M * M x K
```

#### JadenCase 문자열 만들기

```
function solution(s) {
    return s.split(" ")
            .map(v => v.substring(0,1).toUpperCase() + v.substring(1).toLowerCase())
            .join(" ")
}
```

#### N개의 최소공배수

```
function solution(num){
    return num.reduce((acc,cur) => acc*cur / GCD(acc,cur))
}
const GCD = (a,b) => {
    if(b === 0) return a
    return GCD(b, a % b)
}
```

5/28
새로 나온 문제들

#### 괄호 회전하기

stack 문제. 한방에 풀어버린거 보니 아직 안죽었구만...!

```
function solution(s) {
    const arr = s.split("")
    let ans = 0
    for(let i = 0, N = arr.length; i < N; i++){
        if(check(arr)) ans++
        arr.push(arr.shift())
    }
    return ans
}
const check = (array) => {
    const stack = []
    for(let i = 0, N = array.length; i < N; i++){
        if(array[i] === "]"){
            if(stack[stack.length-1] === "[") stack.pop()
            else return false
        }
        else if(array[i] === ")"){
            if(stack[stack.length-1] === "(") stack.pop()
            else return false
        }
        else if(array[i] === "}"){
            if(stack[stack.length-1] === "{") stack.pop()
            else return false
        }
        else stack.push(array[i])
    }
    if(stack.length > 0) return false
    return true
}
```

#### 2개 이하로 다른 비트

완전탐색문제인 줄 알았는데,아니었다.
결국 풀이를 찾아봤음
https://blog.naver.com/PostView.nhn?blogId=diddnjs02&logNo=222356738504&parentCategoryNo=&categoryNo=91&viewDate=&isShowPopularPosts=true&from=search
어려운 문제.

```
function solution(numbers) {
  const ans = [];

  for (let number of numbers) {
    if (number % 2 === 0) ans.push(number + 1);
    else {
      const bit = number.toString(2).split("")
      if (bit.every((val) => val === "1")) {
        bit[0] = "10"
      } else {
        for (let i = bit.length - 1; i >= 0; i--) {
          if (bit[i] === "0") {
            bit[i] = "1";
            bit[i + 1] = "0";
            break;
          }
        }
      }
      ans.push(parseInt(bit.join(""), 2));
    }
  }
  return ans;
}

```

#### 행렬 테두리 회전하기

어려워서 못 품 https://www.cckn.dev/problem-solve/20210427-2/ 방식
진짜 기발하네...!

```
function solution(rows, columns, queries) {
  const ans = []
  const board = Array(rows)
    .fill(0)
    .map(() => Array(columns))

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = i * columns + j + 1
    }
  }
  queries.forEach(query => {
    const [x1, y1, x2, y2] = query.map(pos => pos - 1)
    const queue = []

    for (let i = 0; i < y2 - y1; i++) queue.push(board[x1][y1 + i])
    for (let i = 0; i < x2 - x1; i++) queue.push(board[x1 + i][y2])
    for (let i = 0; i < y2 - y1; i++) queue.push(board[x2][y2 - i])
    for (let i = 0; i < x2 - x1; i++) queue.push(board[x2 - i][y1])

    queue.unshift(queue.pop())
    ans.push(Math.min(...queue))

    for (let i = 0; i < y2 - y1; i++) board[x1][y1 + i] = queue.shift()
    for (let i = 0; i < x2 - x1; i++) board[x1 + i][y2] = queue.shift()
    for (let i = 0; i < y2 - y1; i++) board[x2][y2 - i] = queue.shift()
    for (let i = 0; i < x2 - x1; i++) board[x2 - i][y1] = queue.shift()
    console.log(board)
  })
  return ans
}
```
