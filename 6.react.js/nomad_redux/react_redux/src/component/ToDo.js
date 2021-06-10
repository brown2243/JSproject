import React from "react";
import { connect } from "react-redux";
import { actionCreator } from "../store";
import { Link } from "react-router-dom";

function ToDo({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>
        {text} <button onClick={onBtnClick}>delete</button>
      </Link>
    </li>
  );
}
function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps);
  return {
    onBtnClick: () => dispatch(actionCreator.deleteToDo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
