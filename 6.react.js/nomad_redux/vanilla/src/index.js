import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

const addToDo = (text) => {
  return { type: ADD_TODO, text };
};

const delToDo = (id) => {
  return { type: DEL_TODO, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DEL_TODO:
      return state.filter((toDo) => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};
const store = createStore(reducer);

const paintToDos = () => {
  ul.innerHTML = "";
  const toDos = store.getState();
  console.log("paint");
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDelToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    btn.innerText = "del";

    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};
const dispatchDelToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(delToDo(id));
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
store.subscribe(() => console.log(store.getState()));
store.subscribe(paintToDos);
