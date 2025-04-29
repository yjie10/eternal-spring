import { useState, useRef, useEffect } from 'react';
import StartPage from './components/StartPage';
import PlayingPage from './components/PlayingPage';
import WinningMessage from './components/WinningMessage';

import './App.css';

/* Utilities */

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

const confirmAction = (message, onConfirm) => {
  const confirmed = window.confirm(message);
  if (confirmed) {
    onConfirm();
  }
};

const evaluateGuess = (currentGuess, secretNumbers) => {
  const count = { yin: 0, yang: 0 };
  for (let i = 0; i < secretNumbers.length; i++) {
    const isNumberPresent = secretNumbers.includes(currentGuess[i]);
    if (secretNumbers[i] === currentGuess[i]) {
      count.yang++;
    } else if (isNumberPresent) {
      count.yin++;
    }
  }
  return count;
};

function App() {
  /* State */

  const [secretNumbers, setSecretNumbers] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [history, setHistory] = useState([]);
  const [gamePhase, setGamePhase] = useState('start');
  const [showModal, setShowModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  /* console.log(secretNumbers); // leaving in for quick testing purposes */

  /* bgm */

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  /* Handlers */

  const startGame = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((error) => {
        console.log('Autoplay error:', error);
      });
    }
    setSecretNumbers(shuffle());
    setHistory([]);
    setCurrentGuess(Array(4).fill(0));
    setGamePhase('playing');
  };

  const handleRestart = () => {
    confirmAction('Are you sure you want to restart the game?', startGame);
  };

  const handleReturnToTitle = () => {
    confirmAction('Are you sure you want to return to the title?', () => {
      setShowModal(false);
      setGamePhase('start');
    });
  };

  const handleChange = (index, direction) => {
    setCurrentGuess((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + (direction === 'up' ? 1 : 9)) % 10;
      return updated;
    });
  };

  const handleGuess = () => {
    const count = evaluateGuess(currentGuess, secretNumbers);

    const guessEntry = {
      guess: [...currentGuess],
      result: `${count.yang} Yang 🌕 ${count.yin} Yin 🌑`,
    };

    setHistory((prevGuesses) => [...prevGuesses, guessEntry]);

    if (count.yang === 4) {
      setGamePhase('win');
    }
  };

  /* Render */

  return (
    <>
      <audio ref={audioRef} src="/scar03.mp3" autoPlay loop muted />
      {gamePhase === 'start' ? (
        <StartPage startGame={startGame} />
      ) : (
        <>
          {gamePhase === 'win' && <WinningMessage />}
          <PlayingPage
            handleReturnToTitle={handleReturnToTitle}
            setShowModal={setShowModal}
            showModal={showModal}
            currentGuess={currentGuess}
            handleChange={handleChange}
            handleGuess={handleGuess}
            gamePhase={gamePhase}
            handleRestart={handleRestart}
            history={history}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        </>
      )}
    </>
  );
}

export default App;
