import React from "react";

const Square = ({ letter, borderColor }) => {
  return (
    <div className="square" style={{ borderColor }}>
      {letter}
    </div>
  );
};

export default Square;
