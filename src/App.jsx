import { useState } from 'react';
import NumberBox from './components/NumberBox';
import GuessHistory from './components/GuessHistory';

import './App.css';

const shuffle = () => {
  const numbers = [];
  while (numbers.length < 4) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

function App() {
  const [secretNumbers, setSecretNumbers] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [history, setHistory] = useState([]);
  const [gamePhase, setGamePhase] = useState('start');
  const [showRules, setShowRules] = useState(false);

  console.log(secretNumbers);

  const startGame = () => {
    setSecretNumbers(shuffle());
    setHistory([]);
    setCurrentGuess(Array(4).fill(0));
    setGamePhase('playing');
  };

  const handleRestart = () => {
    const confirmRestart = window.confirm(
      'Are you sure you want to restart the game?'
    );
    if (confirmRestart) {
      startGame();
    }
  };

  const returnToTitle = () => {
    setGamePhase('start');
  };

  const handleChange = (index, direction) => {
    setCurrentGuess((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + (direction === 'up' ? 1 : 9)) % 10;
      return updated;
    });
  };

  const handleGuess = () => {
    const count = {
      yin: 0,
      yang: 0,
    };

    for (let i = 0; i < secretNumbers.length; i++) {
      const isNumberPresent = secretNumbers.includes(currentGuess[i]);
      if (secretNumbers[i] === currentGuess[i]) {
        count.yang++;
      } else if (isNumberPresent) {
        count.yin++;
      }
    }

    const guessEntry = {
      guess: [...currentGuess],
      result: `${count.yang} Yang 🌕 ${count.yin} Yin 🌑`,
    };

    setHistory((prevGuesses) => [...prevGuesses, guessEntry]);

    if (count.yang === 4) {
      setGamePhase('win');
    }
  };

  return gamePhase === 'start' ? (
    <div>
      <button onClick={startGame}>Start</button>
    </div>
  ) : (
    <div>
      <h1>Eternal Spring</h1>
      <button onClick={returnToTitle}>Return to Title</button>
      <button onClick={() => setShowRules(true)}>❓</button>
      {showRules && (
        <div className="modal">
          <h2>How to Play</h2>
          <p>Find the secret numbers</p>
          <button onClick={() => setShowRules(false)}>❎</button>
        </div>
      )}
      {currentGuess.map((number, index) => (
        <NumberBox
          key={`box-${index}`}
          index={index}
          value={number}
          handleChange={(index, direction) => handleChange(index, direction)}
        />
      ))}
      <button onClick={handleGuess} disabled={gamePhase === 'win'}>
        Guess!
      </button>
      <button onClick={handleRestart}>Restart</button>
      <GuessHistory history={history} />
    </div>
  );
}

export default App;
