import React from "react";

function Ball(props) {
  let background;
  if (props.number <= 10) background = "red";
  else if (props.number <= 20) background = "orange";
  else if (props.number <= 30) background = "purple";
  else if (props.number <= 40) background = "blue";
  else if (props.number <= 50) background = "green";

  return (
    <div className="ball" style={{ background }}>
      {props.number}
    </div>
  );
}

export default Ball;
