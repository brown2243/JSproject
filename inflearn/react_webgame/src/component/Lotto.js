import React, { useEffect, useRef, useState, useMemo } from "react";
import Ball from "./Ball";

const getNumber = () => {
  console.log("getNumber");
  const candidate = new Array(45).fill().map((v, i) => i + 1);
  const box = [];
  while (candidate.length > 0) {
    box.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonus = box[box.length - 1];
  const win = box.slice(0, 6).sort((a, b) => a - b);
  return [...win, bonus];
};

function Lotto() {
  const [count, setCount] = useState(0);
  // winNum에 useState(getNumber())를 하니 함수가 계속 실행되는 상황
  // useMemo는 메모이제이션으로 효율성을 올려줌
  // useRef는 일반 값을 기억 useMemo는 복잡한 함수의 결과값을 기억
  const lottoNum = useMemo(() => getNumber(), []);

  const [winNum, setwinNum] = useState(lottoNum);
  const [winBall, setwinBall] = useState([]);
  const [bonus, setbonus] = useState(null);
  const [redo, setredo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    console.log("useEffect");
    for (let i = 0; i < winNum.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        return setwinBall((prev) => [...prev, winNum[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setbonus(winNum[6]);
      setredo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일

  const onClickRedo = () => {
    setwinNum(getNumber());
    setwinBall([]);
    setbonus(null);
    setredo(false);
    timeouts.current = [];
  };

  return (
    <div>
      <h1>로또 추첨기</h1>
      <div id="result">
        {winBall.map((v) => (
          <Ball key={v} number={v}></Ball>
        ))}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo ? <button onClick={onClickRedo}>한번 더</button> : null}

      <h1>cnt</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Lotto;
