import "./App.css";
import { Component } from "react";

// function App() {
//   return (
//     <div className="App">
//       <button>like</button>
//     </div>
//   );
// }

class Gugudan extends Component {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState({
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: "",
        result: this.state.first * this.state.second,
      });
    } else {
      this.setState({
        value: "",
        result: "오답",
      });
    }
  };
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <>
        <div>
          {this.state.first} * {this.state.second} = ?
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="number"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

export default Gugudan;
