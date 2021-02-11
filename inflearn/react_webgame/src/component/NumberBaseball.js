import React, { useState } from "react";
import Try from "./Try";

// rfce react-function-??-export

const getNumber = () => {
  const candidate = new Array(9).fill(0).map((v, i) => i + 1);
  const array = [];
  for (let i = 0; i < 4; i++) {
    array.push(candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
  }
  return array;
};

function NumberBaseball() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [answer, setAnswer] = useState(getNumber);
  const [tries, setTries] = useState([]);

  console.log(answer);

  const init = () => {
    alert("게임을 다시 시작합니다.");
    setValue("");
    setAnswer(getNumber);
    setTries([]);
  };

  const onChange = (e) => setValue(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setResult("홈런");
      init();
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패!\n 답은 ${answer.join(",")} 입니다.`);
        init();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) strike++;
          else if (answer.includes(answerArray[i])) ball++;
        }
        setTries((prevTries) => [
          ...prevTries,
          { try: value, result: `strike = ${strike}, ball = ${ball}` },
        ]);
      }
    }
    setValue("");
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input type="text" maxLength={4} value={value} onChange={onChange} />
      </form>
      <div>시도한 횟수 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도: `} tryInfo={v}></Try>;
        })}
      </ul>
    </>
  );
}

export default NumberBaseball;
