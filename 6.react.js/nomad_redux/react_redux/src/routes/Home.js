import React, { useState } from "react";
import { connect } from "react-redux";

function Home() {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
  };
  return (
    <>
      <h1>home</h1>
      <form>
        <input
          type="text"
          value={text}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </form>
      <ul></ul>
    </>
  );
}

function getCurrentState(state, ownProps) {
  return {};
}

export default connect(getCurrentState)(Home);
