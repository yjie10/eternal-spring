import { useState } from 'react';
import StartPage from './components/StartPage';
import PlayingPage from './components/PlayingPage';
import WinningMessage from './components/WinningMessage';

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
  const [showModal, setShowModal] = useState(false);

  // console.log(secretNumbers);

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
    const confirmReturn = window.confirm(
      'Are you sure you want to return to the title?'
    );
    if (confirmReturn) {
      setShowModal(false);
      setGamePhase('start');
    }
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
    <StartPage startGame={startGame} />
  ) : (
    <>
      {gamePhase === 'win' && <WinningMessage />}
      <PlayingPage
        returnToTitle={returnToTitle}
        setShowModal={setShowModal}
        showModal={showModal}
        currentGuess={currentGuess}
        handleChange={handleChange}
        handleGuess={handleGuess}
        gamePhase={gamePhase}
        handleRestart={handleRestart}
        history={history}
      />
    </>
  );
}

export default App;
