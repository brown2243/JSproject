import React from "react";
import Tr from "./Tr";

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table onClick={onClick}>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr
            key={i}
            dispatch={dispatch}
            rowIndex={i}
            rowData={tableData[i]}
          ></Tr>
        ))}
    </table>
  );
};

export default Table;
