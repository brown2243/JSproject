import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../component/ToDo";
import { actionCreator } from "../store";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addToDo(text);
    setText("");
  };
  return (
    <>
      <h1>home</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state };
}
function mapDispatchToProps(dispatch) {
  return { addToDo: (text) => dispatch(actionCreator.addToDo(text)) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
