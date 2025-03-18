import React, { useState } from "react";
import WordBox from "./components/CharBox";
import Keyboard from "./components/Keyboard";
import "./styles.css";

const MAX_LETTERS = 5;

const App = () => {
  const [letters, setLetters] = useState([]);
  const [borderColor, setBorderColor] = useState("black");

  const handleCharacterClick = (char) => {
    if (letters.length < MAX_LETTERS) {
      setLetters([...letters, char]);
    }
  };

  const handleBackspace = () => {
    if (letters.length > 0) {
      setLetters(letters.slice(0, -1));
    }
  };

  const handleEnter = async () => {
    if (letters.length === MAX_LETTERS) {
      const word = letters.join("");
      const isValid = await checkWordInDictionary(word);
      setBorderColor(isValid ? "green" : "red");
    } else {
      setBorderColor("red");
    }
  };

  const checkWordInDictionary = async (word) => {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.ok)
      .catch(() => false);
  };

  return (
    <div className="game-container">
      <WordBox letters={letters} borderColor={borderColor} maxLetters={MAX_LETTERS} />
      <Keyboard
        onCharacterClick={handleCharacterClick}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
    </div>
  );
};

export default App;
