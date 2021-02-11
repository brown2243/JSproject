import React, { useState, useRef } from "react";

const Gugudan2 = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  // const [state, setState] = useState({
  //   first: Math.ceil(Math.random() * 9),
  //   second: Math.ceil(Math.random() * 9),
  //   value: "",
  //   result: "",
  // });
  // state를 위처럼 합치면 개별설정할때도 전부 적어줘야한다 그래서 쪼개서 사용
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();

    if (parseInt(value) === first * second) {
      setResult(`정답 : ${value}`);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
    } else {
      setResult("오답");
      setValue("");
    }

    inputRef.current.focus();
  };

  return (
    <>
      <h1>구구단</h1>
      <div>Hello, hooks</div>
      <div>
        {first} * {second} = ?
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          onChange={onChangeInput}
          value={value}
          type="text"
        />
        <button className="">입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

// class Gugudan extends Component {
//   state = {
//     first: Math.ceil(Math.random() * 9),
//     second: Math.ceil(Math.random() * 9),
//     value: "",
//     result: "",
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     if (parseInt(this.state.value) === this.state.first * this.state.second) {
//       this.setState((prevState) => {
//         return {
//           first: Math.ceil(Math.random() * 9),
//           second: Math.ceil(Math.random() * 9),
//           value: "",
//           result: `과거정답 : ${prevState.value}
//                    현재정답 : ${this.state.first * this.state.second}`,
//         };
//       });
//       this.input.focus();
//     } else {
//       this.setState({
//         value: "",
//         result: "오답",
//       });
//     }
//   };
//   onChange = (e) => {
//     this.setState({ value: e.target.value });
//   };
//   input;
//   ref = (c) => {
//     this.input = c;
//   };
//   render() {
//     return (
//       <>
//         <div>
//           {this.state.first} * {this.state.second} = ?
//         </div>
//         <form onSubmit={this.onSubmit}>
//           <input
//             ref={this.ref}
//             type="number"
//             value={this.state.value}
//             onChange={this.onChange}
//           />
//           <button>입력</button>
//         </form>
//         <div>{this.state.result}</div>
//       </>
//     );
//   }
// }

export default Gugudan2;
