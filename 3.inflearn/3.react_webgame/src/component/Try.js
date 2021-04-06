import React from "react";

function Try({ tryInfo }) {
  // (props) 이러면 props.tryInfo.try
  return (
    <li>
      <div>
        <b>{tryInfo.try}</b>
      </div>
      <div>{tryInfo.result}</div>
    </li>
  );
}

export default Try;
