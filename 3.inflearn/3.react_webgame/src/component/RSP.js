import React, { Component } from "react";

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
class RSP extends Component {
  state = {
    result: "",
    imgCoord: rspCoords.바위,
    score: 0,
  };
  interval;

  // 컴포넌트의 생애 = 라이프사이클
  // 인터벌은 취소를 따로 안해주면 그냥 계속 실행되고 있기때문에
  // 컴포넌트가 없어졌다 생겼다하는경우 중첩되서 실행될수 있기 때문에 반드시 이런식으로
  // clear를 해줘야함
  componentDidMount() {
    // 컴포넌트가 첫 렌더링 된 후 비동기요청을 여기서 많이 함
    this.interval = setInterval(this.changeHand, 1000);
  }
  // 고차 함수라 함
  onClickBtn = (choice) => (e) => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(this.state.imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다.",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prev) => {
        return {
          result: "이겼습니다.",
          score: prev.score + 1,
        };
      });
    } else {
      this.setState((prev) => {
        return {
          result: "졌습니다.",
          score: prev.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 1000);
    }, 1500);
  };
  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };
  render() {
    const { result, score, imgCoord } = this.state;
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
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
          <div>{result}</div>
          <div>현재 {score}점</div>
        </div>
      </div>
    );
  }
}
export default RSP;
