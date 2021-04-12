import React, { useRef, useState } from "react";

function ResponseCheck() {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClick = (e) => {
    if (state === "waiting") {
      setState("ready");
      setMessage("준비!!!!");

      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭하세요");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 1000);
    } else if (state === "ready") {
      clearTimeout(timeOut.current);
      setState("waiting");
      setMessage("너무 빨랐습니다");
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prev) => {
        console.log(endTime.current - startTime.current);
        return [...prev, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };
  const renderAvg = () => {
    return result.length === 0
      ? 0
      : Math.round(result.reduce((acc, cur) => acc + cur) / result.length);
  };
  return (
    <div>
      <h1>반응속도 체크</h1>
      <div id="screen" className={state} onClick={onClick}>
        <h1>{message}</h1>
      </div>
      <div>
        평균 시간
        {renderAvg()}ms
      </div>
      <button onClick={onReset}> 초기화</button>
    </div>
  );
}

export default ResponseCheck;
