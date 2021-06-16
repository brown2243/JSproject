import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

// const ADD = "ADD";
// const DELETE = "DELETE";

// const addToDo = (text) => {
//   return {
//     type: ADD,
//     text,
//   };
// };
// const deleteToDo = (id) => {
//   return {
//     type: DELETE,
//     id,
//   };
// };

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case ADD:
//       return [{ text: action.text, id: Date.now() }, ...state];
//     case DELETE:
//       return state.filter((toDo) => toDo.id !== action.id);
//     default:
//       return state;
//   }
// };

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.text, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreator = {
  addToDo,
  deleteToDo,
};
export default store;
