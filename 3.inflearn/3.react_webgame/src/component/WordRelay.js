import React, { useRef, useState } from "react";

function WordRelay() {
  const [word, setWord] = useState("은슬라");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const inputRef = useRef(null);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue("");
      setResult("OK");
    } else {
      setValue("");
      setResult("NO");
    }
    inputRef.current.focus();
  };
  return (
    <div>
      <h1>끝말잇기</h1>
      <h2>{word}</h2>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} value={value} onChange={onChange} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </div>
  );
}

export default WordRelay;
