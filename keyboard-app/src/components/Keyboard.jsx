import React from "react";

const Keyboard = ({ onCharacterClick, onBackspace, onEnter }) => {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {keys.map((key) => (
          <button key={key} onClick={() => onCharacterClick(key)}>
            {key}
          </button>
        ))}
        <button className="backspace" onClick={onBackspace}>⌫</button>
        <button className="enter" onClick={onEnter}>↵</button>
      </div>
    </div>
  );
};

export default Keyboard;
