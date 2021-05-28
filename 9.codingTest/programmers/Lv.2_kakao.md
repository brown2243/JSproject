## 카카오

lv.2임에도 카카오 문제는 어렵다. 몇몇 어려운 애들은 lv3보다 어려움.
두번 정도 풀었던 문제들인데도 다시보니까 또 어렵네 ㅅㅂㅋㅋㅋㅋ....

#### [1차] 캐시

```
function solution(cacheSize, cities) {
    const cache = new Array(cacheSize)
    let total = 0
    cities.forEach(v => {
        v = v.toUpperCase()
        if(cache.includes(v)){
            total += 1
            cache.splice(cache.indexOf(v), 1)
            cache.push(v)
        }
        else {
            total += 5
            cache.push(v)
            cache.shift()
        }
    })
    return total
}
```

#### [1차] 프렌즈4블록

```
function solution(m, n, board) {
    board = board.map(v => v.split(''))

    while(true){
        let tmp = []
        for (let i = 1; i < m; i++){
            for (let j = 1; j < n; j++){
                if (board[i][j] &&
                    board[i][j] === board[i-1][j] &&
                    board[i][j] === board[i][j-1] &&
                    board[i][j] === board[i-1][j-1]){
                    tmp.push([i,j])
                }
            }
        }
        if (!tmp.length) {
            return board.reduce((acc,cur) => acc + cur.filter(v => !v).length, 0)
        }

        tmp.forEach(a => {
            board[a[0]][a[1]] = 0;
            board[a[0]][a[1] - 1] = 0;
            board[a[0] - 1][a[1] - 1] = 0;
            board[a[0] - 1][a[1]] = 0;
        });

        for (let i = m-1; i > 0; i--){
            for (let j = 0; j < n; j++){
                if (board[i][j] === 0) {
                    for (let z = i-1; z >= 0; z--){
                        if(board[z][j] !== 0){
                            board[i][j] = board[z][j]
                            board[z][j] = 0
                            break
                        }
                    }
                }
            }
        }
    }
}
```

#### [1차] 뉴스 클러스터링

```
function solution(str1, str2) {
    const change = (str) => {
        const arr = []
        for(let i = 0; i < str.length; i++){
            let a = str.substr(i,2).toUpperCase()
            if(a.match(/[A-Z]{2}/)){
                arr.push(a)
            }
        }
        return arr
    }
    const arr1 = change(str1)
    const arr2 = change(str2)

    const set = new Set([...arr1, ...arr2]);
    let union = 0;
    let intersection = 0;

    set.forEach(item => {
        const has1 = arr1.filter(x => x === item).length;
        const has2 = arr2.filter(x => x === item).length;
        union += Math.max(has1, has2);
        intersection += Math.min(has1, has2);
    })
    return union === 0 ? 65536 : Math.floor(intersection / union * 65536);
}
```

#### [3차] n진수 게임

```
function solution(n, t, m, p) {
    let str = '', i = 0, ans = ''
    while (str.length < t * m) {
        str += i.toString(n)
        i++
    }
    for (let i = p-1; ans.length < t; i += m) {
        ans += str[i].toUpperCase()
    }
    return ans
}
```

#### [3차] 압축

```
function solution(msg) {
    const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), ans = []

    for (let i = 0; i < msg.length; i++){
        let check = true
        for (let j = alpha.length-1; j > 26; j--){
            if (alpha[j] === msg.substr(i, alpha[j].length)) {
                ans.push(j)
                alpha.push(msg.substr(i, alpha[j].length + 1))
                i += alpha[j].length - 1
                check = false
                break
            }
        }
        if (check) {
            alpha.push(msg.substr(i, 2))
            ans.push(alpha.indexOf(msg[i]))
        }
    }
    return ans
}
```

#### [3차] 방금그곡

```
function solution(m, musicinfos) {
    m = m.replace(/(\D)#/g, (s,p1)=> p1.toLowerCase());
    musicinfos = musicinfos.map(v => v.split(','))
    let ans = []
    for(let [start, end, name, music] of musicinfos){
        let min = end.substring(3) - start.substring(3) + (end.substring(0,2) - start.substring(0,2)) * 60
        music = music.replace(/(\D)#/g, (s,p1)=> p1.toLowerCase());
        const N = music.length, repeatSong = music.repeat(Math.floor(min/N)) + music.substring(0, min%N)
        ans.push([name,repeatSong,music])
    }

    const answer = ans.reduce((acc, cur)=>{
        if(cur[1].includes(m)){
            if(acc.length == 0 || acc[1].length < cur[1].length) return cur;
        }
        return acc;
    },[]);
    return (answer.length == 0)? "(None)" : answer[0];
}
```

#### [3차] 파일명 정렬

```
function solution(files) {
    const ans = []
    files.forEach((v,i) => {
       let tmp = v.split(/(\d+)/)
       ans.push([i,tmp])
    })
    ans.sort((a, b) => {
        const upperA = a[1][0].toUpperCase()
        const upperB = b[1][0].toUpperCase()
        if(upperA < upperB) return -1
        else if(upperA > upperB) return 1
        else {
            if(Number(a[1][1]) < Number(b[1][1])) return -1
            else if(Number(a[1][1]) > Number(b[1][1])) return 1
            else {
                if(a[0] < b[0]) return -1
                else return 1
            }
        }
    })
    const box = []
    ans.forEach(v => {
        box.push(v[1].join(''))
    })
    return box
}
```

#### 오픈채팅방

```
function solution(record) {
    const obj = {}, arr = [], ans = []
    for (let v of record){
        v = v.split(' ')
        if (v[0] === 'Enter'){
            obj[v[1]] = v[2]
            arr.push(v)
        }
        else if (v[0] === 'Change') obj[v[1]] = v[2]
        else arr.push(v)
    }
    for (let [a, b] of arr) {
        if (a === 'Enter') ans.push(`${obj[b]}님이 들어왔습니다.`)
        else ans.push(`${obj[b]}님이 나갔습니다.`)
    }
    return ans
}
```

#### 튜플

```
function solution(s) {
    const ans = []
    s = s.substring(2,s.length-2)
         .split('},{')
         .sort((a,b) => a.length - b.length)
         .map(v => v.split(',').map(v => Number(v)))
    for(let val of s){
        for(let v of val){
            if(!ans.includes(v)) ans.push(v)
        }
    }
    return ans
}
```

#### 문자열 압축

```
function solution(s) {
    const ans = []
    for (let i = 1; i <= s.length / 2; i++){
        let tmp = '', cnt = 1
        for (let j = 0; j < s.length; j += i){
            if(s.substr(j, i) === s.substr(j+i, i)){
                cnt++
            }
            else {
                if(cnt > 1){
                    tmp = tmp + cnt + s.substr(j, i)
                    cnt = 1
                }
                else {
                    tmp = tmp + s.substr(j, i)
                }
            }
        }
        console.log(tmp)
        ans.push(tmp.length)
    }
    return Math.min(...ans)
}
```

#### 괄호 변환

```
function solution(p) {
    let check = false, left = 0, right = 0, ans = ""

    if(p.length === 0) return ""

    for(let i = 0; i < p.length; i++){
        if(p[i] === "(") left++
        if(p[i] === ")") right++
        if(right > left) check = true

        if(left === right){
            if(check){
                ans += '('
                ans += solution(p.slice(i+1, p.length))
                ans += ')'

                for(let j = 1; j < i; j++){
                    if(p[j] === ")") ans += '('
                    if(p[j] === "(") ans += ')'
                }
                return ans
            } else {
                ans += p.slice(0, i+1)
                ans += solution(p.slice(i+1,p.length))
                return ans
            }
        }
    }
}
```

#### [카카오 인턴] 수식 최대화

```
function solution(expression) {
    const order = [['+','-','*'],
                   ['+','*','-'],
                   ['*','-','+'],
                   ['*','+','-'],
                   ['-','*','+'],
                   ['-','+','*']]
    const ans = []
    for (let a = 0; a < order.length; a++){
        let arr = expression.split(/(\W)/)
        for (let b = 0; b < order[a].length; b++){
            for (let i = 0; i < arr.length; i++){
                if (arr[i] === order[a][b]) {
                    let sum = eval(`${arr[i-1]} ${arr[i]} ${arr[i+1]}`)
                    arr[i-1] = ''
                    arr[i] = ''
                    arr[i+1] = sum
                }
            }
            arr = arr.filter(v => v)
            if (arr.length === 1) {
                ans.push(Math.abs(arr[0]))
            }
        }
    }

    return Math.max(...ans)
}
```

#### 순위 검색

다시 봐도 모르겠는 문제1.

```
function solution(info, query) {
    const answer = [];
    const infoMap = {};

    function combination(array, score, start) {
        const key = array.join("");
        const value = infoMap[key];

        if (value) {
            infoMap[key].push(score);
        } else {
            infoMap[key] = [score];
        }

        for (let i = start; i < array.length; i++) {
            const temp = [...array];
            temp[i] = "-";
            combination(temp, score, i + 1);
        }
    }

    for (const e of info) {
        const splited = e.split(" ");
        const score = Number(splited.pop());
        combination(splited, score, 0);
    }

    for (const key in infoMap) {
        infoMap[key] = infoMap[key].sort((a, b) => a - b);
    }

    for (const e of query) {
        const splited = e.replace(/ and /g, " ").split(" ");
        const score = Number(splited.pop());
        const key = splited.join("");
        const array = infoMap[key];

        if (array) {
            let start = 0;
            let end = array.length;
            while (start < end) {
                const mid = Math.floor((start + end) / 2);

                if (array[mid] >= score) {
                    end = mid;
                } else if (array[mid] < score) {
                    start = mid + 1;
                }
            }

            const result = array.length - start;
            answer.push(result);
        } else {
            answer.push(0);
        }
    }

    return answer;
}
```

#### 메뉴 리뉴얼

다시 봐도 모르겠는 문제2.

```
function solution(orders, course) {
    const orderedCountMap = new Map();
    const maxCountMap = new Map();
    const courseSet = new Set(course);

    function combination(result, index, str) {
        if (courseSet.has(result.length)) {
            let count = orderedCountMap.get(result) || 0;
            orderedCountMap.set(result, ++count);

            const max = maxCountMap.get(result.length) || 0;
            if (max < count) {
                maxCountMap.set(result.length, count);
            }
        }

        for (let i = index; i < str.length; i++) {
            combination(result + str[i], i + 1, str);
        }
    }

    orders.map(order => order.split("").sort().join(""))
        .forEach(e => combination("", 0, e));

    maxCountMap.forEach(v => console.log(v))

    return course
        .map(length => {
            const max = maxCountMap.get(length);
            return Array.from(orderedCountMap)
                .filter(e =>
                    e[0].length === length && e[1] >= 2 && e[1] === max
                )
                .map(e => e[0]);
        })
        .flatMap(e => e)
        .sort();
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
