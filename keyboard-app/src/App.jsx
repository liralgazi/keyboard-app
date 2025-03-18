import React, { useState } from "react";
import CharBox from "./components/CharBox";
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

  /*
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

  */
  
  const handleEnter = async () => {
    if (letters.length === MAX_LETTERS) {
      const word = letters.join("");
  
      try {
        const response = await fetch("http://localhost:8000/emit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ action: "CHECK_WORD", data: word }),
          mode: "cors",  
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
  
        const result = await response.json();
        setBorderColor(result.valid ? "green" : "red");  
      } catch (error) {
        console.error("CORS Fetch Error:", error);
        setBorderColor("red");
      }
    } else {
      setBorderColor("red");
    }
  };

  return (
    <div className="game-container">
      <CharBox letters={letters} borderColor={borderColor} maxLetters={MAX_LETTERS} />
      <Keyboard
        onCharacterClick={handleCharacterClick}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
    </div>
  );
};

export default App;
