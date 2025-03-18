import React from "react";
import Square from "./Square";

const CharBox = ({ letters, borderColor, maxLetters }) => {
  return (
    <div className="char-box">
      {[...Array(maxLetters)].map((_, index) => (
        <Square key={index} letter={letters[index] || ""} borderColor={borderColor} />
      ))}
    </div>
  );
};

export default CharBox;
