import React from "react";
import { connect } from "react-redux";

function Detail(toDo) {
  return <h1>{toDo?.text}</h1>;
}

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  console.log(id);
  return { toDos: state.find((toDo) => toDo.id === parseInt(id)) };
}
export default connect(mapStateToProps)(Detail);
