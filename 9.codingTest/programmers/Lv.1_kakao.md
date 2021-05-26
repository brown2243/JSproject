## 카카오

#### [1차] 다트 게임

```
function solution(dartResult) {
    const arr = dartResult.split(""), ans = []
    let tmp =''
    for(let i = 0; i < arr.length; i++){
        if(Number.isInteger(Number(arr[i]))){
             tmp += arr[i]
        } else {
            let num = Number(tmp)
            tmp = ''
            switch(arr[i]){
                case 'S':
                    ans.push(num**1)
                    break
                case 'D':
                    ans.push(num**2)
                    break
                case 'T':
                    ans.push(num**3)
                    break
                case '*':
                    ans[ans.length-1] *= 2
                    ans[ans.length-2] *= 2
                    break
                case '#':
                    ans[ans.length-1] *= -1
                    break
            }
            console.log(ans)
        }
    }
    console.log(ans)
    return ans.reduce((acc,cur) => acc+cur)
}
```

#### [1차] 비밀지도

```
function solution(n, arr1, arr2) {
    arr1 = arr1.map(v => v.toString(2))
               .map(v => '0'.repeat((n - v.length)) + v)
    arr2 = arr2.map(v => v.toString(2))
               .map(v => '0'.repeat((n - v.length)) + v)
    const ans = Array.from({length:n}, () => new Array(n).fill("#"))
    return ans.map((val, idx1) => val.map((v, idx2)=> {
        if(arr1[idx1][idx2] === '0' && arr2[idx1][idx2] === '0'){
            return ' '
        } else return v
    }).join(""))
}
```

#### 실패율

```
function solution(N, stages) {
    const stage = []
    let totalnum = stages.length

    for(let i=1; i <= N; i++){
        const num = stages.filter(val => val === i).length
        if(num === 0){
            stage.push({idx:i, ratio:0})
        } else {
            stage.push({idx:i, ratio:(num / totalnum)})
            totalnum -= num
        }
    }
    console.log(stage)
    stage.sort((a,b) => {
        if(b.ratio === a.ratio){
            return a.idx - b.idx
        } else {
            return b.ratio - a.ratio
        }
    })
    return stage.map(val => val.idx)
}

```

#### 크레인 인형뽑기 게임

```
function solution(board, moves) {
    const ans = []
    let cnt = 0
    moves.forEach(v => {
        for(let i = 0; i < board.length; i++){
            if(board[i][v-1] !== 0){
                if(board[i][v-1] === ans[ans.length-1]){
                    ans.pop()
                    cnt += 2
                } else {
                    ans.push(board[i][v-1])
                }
                board[i][v-1] = 0
                break
            }
        }
    })
    return cnt
}
```

#### [카카오 인턴] 키패드 누르기

```
function solution(numbers, hand) {
    const box ={1 : [0,0], 2 : [0,1], 3 : [0,2],
                4 : [1,0], 5 : [1,1], 6 : [1,2],
                7 : [2,0], 8 : [2,1], 9 : [2,2],
                11: [3,0], 0 : [3,1], 12: [3,2]}
    let left = box[11], right = box[12], ans = ''
    for(let v of numbers){
        if(v === 1 || v === 4 || v === 7){
            left = box[v]
            ans += 'L'
        }
        else if(v === 3 || v === 6 || v === 9){
            right = box[v]
            ans += 'R'
        }
        else {
            let target    = box[v]
            let leftRange = Math.abs(left[0] - target[0]) + Math.abs(left[1] - target[1])
            let rightRange= Math.abs(right[0]- target[0]) + Math.abs(right[1]- target[1])
            if(leftRange < rightRange){
                left = box[v]
                ans += 'L'
            }
            else if(rightRange < leftRange){
                right = box[v]
                ans += 'R'
            }
            else {
                if(hand === 'left'){
                    left = box[v]
                    ans += 'L'
                }
                else {
                    right = box[v]
                    ans += 'R'
                }
            }
        }
    }
    return ans
}
```

#### 신규 아이디 추천

이 문제가 lv.1 이라는게 ㄷㄷ...

```
// 정규식 풀이
function solution(new_id) {
    const answer = new_id
        .toLowerCase() // 1
        .replace(/[^\w-_.]/g, '') // 2
        .replace(/\.+/g, '.') // 3
        .replace(/^\.|\.$/g, '') // 4
        .replace(/^$/, 'a') // 5
        .slice(0, 15).replace(/\.$/, ''); // 6
    const len = answer.length;
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}

// 비 정규식 풀이
function solution(nid) {
    const ans = "";
    for (let i = 0; i < nid.length; i++) {
        let c = nid[i].toLowerCase();
        if ("0123456789abcdefghijklmnopqrstuvwxyz.-_".indexOf(c) === -1) continue;
        if (c === "." && ans[ans.length - 1] === "." && nid[i - 1]) continue;
        ans += c;
    }
    if (ans[0] === ".") ans = ans.slice(1);
    ans = ans.slice(0, 15);
    if (ans[ans.length - 1] === ".") ans = ans.slice(0, ans.length - 1);
    if (!ans) ans = "a";
    while (ans.length < 3) ans += ans[ans.length - 1];
    return ans;
}
```
