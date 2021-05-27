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

####

```

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

####

```

```

####

```

```

####

```

```
