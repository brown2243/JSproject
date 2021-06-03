import "./App.css";
import React, { useState, useRef } from "react";

function App() {
  const [arr, setArr] = useState([]);
  const [model, setmodel] = useState(false);

  const [num, setnum] = useState(0);
  const [modelNum, setmodelNum] = useState(0);
  const numRef = useRef(null);

  const onChangeNum = (e) => setnum(Number(e.target.value));
  const onChangeModelNum = (e) => setmodelNum(num + Number(e.target.value));

  const onModel = () => setmodel(true);
  const offModel = () => setmodel(false);

  const doCal = (e) => {
    offModel();
    setArr([...arr, modelNum]);
    setnum(0);
    numRef.current.focus();
  };

  const deleteValue = (e) => {
    const delIdx = Number(e.target.getAttribute("data-key"));
    const fixedArr = arr.filter((v, i) => i !== delIdx);
    setArr([...fixedArr]);
  };

  return (
    <div className="App">
      <div className="head">
        <div>
          input :{" "}
          <input
            type="number"
            ref={numRef}
            className="textRight"
            value={num}
            onChange={onChangeNum}
          />
          <button onClick={onModel}>계산기</button>
        </div>
      </div>
      {model ? (
        <div className="model">
          <div className="X">
            <button onClick={offModel}>X</button>
          </div>
          <div className="row">
            <div>입력1 :</div>
            <div>{num}</div>
          </div>
          <div className="row">
            <div>입력2 :</div>
            <div>
              <input
                type="number"
                style={{ width: "50px", textAlign: "right" }}
                onChange={onChangeModelNum}
              />
            </div>
          </div>
          <div className="row">
            <div>결과값 :</div>
            <div>{modelNum}</div>
          </div>
          <button onClick={doCal}>계산</button>
        </div>
      ) : (
        <div></div>
      )}

      <div className="body">
        <table>
          <thead>
            <tr>
              <td>순서</td>
              <td className="textRight">값</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {arr.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}번째</td>
                  <td className="textRight">{v}</td>
                  <td>
                    <button onClick={deleteValue} data-key={i}>
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
