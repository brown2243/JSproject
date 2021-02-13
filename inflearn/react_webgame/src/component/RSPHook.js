import React, { useState, useRef, useEffect } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSPHook = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  // 라이프사이클 매서드 대체
  // 매번clear를 하고있기 때문에 그냥settimeout하는 것과 동일
  useEffect(() => {
    // componentDidMount, componentDidUpdate 대체 (1대1 대응 아님)
    interval.current = setInterval(changeHand, 1000);
    return () => {
      // componentWillUnmount 대체
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const onClickBtn = (choice) => (e) => {
    if (interval.current) {
      clearInterval(interval.current);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비겼습니다.");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼습니다.");
        setScore((prev) => prev + 1);
      } else {
        setResult("졌습니다.");
        setScore((prev) => prev - 1);
      }
      setTimeout(() => {
        interval.current = setInterval(changeHand, 1000);
      }, 1500);
    }
  };

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) setImgCoord(rspCoords.가위);
    else if (imgCoord === rspCoords.가위) setImgCoord(rspCoords.보);
    else if (imgCoord === rspCoords.보) setImgCoord(rspCoords.바위);
  };

  return (
    <div>
      <h1>가위바위보</h1>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </div>
    </div>
  );
};

export default RSPHook;
