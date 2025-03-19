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
        // Send the word to the backend for validation
        const response = await fetch("http://localhost:8000/emit", {
          method: "POST",
          headers: {
            // Ensures JSON data is sent
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ action: "CHECK_WORD", data: word }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
  
        const result = await response.json();
        // Debug log to check the response
        console.log("API Response:", result); 
  
        // Set border color based on word validity
        setBorderColor(result.valid ? "green" : "red");
      } catch (error) {
        console.error("API Fetch Error:", error);
        setBorderColor("red"); 
      }
    } else {
      // still not valid 
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
