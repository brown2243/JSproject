import React, { useEffect, useRef, useState } from "react";
import Ball from "./Ball";

const getNumber = () => {
  console.log("추첨실행");
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
  const [winNum, setwinNum] = useState(getNumber());
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

  const onClickRedo = () => {};

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
      <button onClick={redo ? onClickRedo : () => {}}>한번 더</button>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Lotto;
