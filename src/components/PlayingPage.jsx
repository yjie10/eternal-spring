// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import NumberBox from './NumberBox';
import GuessHistory from './GuessHistory';

import { GAME_INSTRUCTIONS } from '../constants/instructions';

const PlayingPage = ({
  returnToTitle,
  setShowModal,
  showModal,
  currentGuess,
  handleChange,
  handleGuess,
  gamePhase,
  handleRestart,
  history,
}) => (
  <div className="bg-gradient-to-b from-gray-100 via-amber-50 to-gray-200 flex flex-col items-center min-h-screen space-y-6">
    <button
      className="absolute top-4 right-4 bg-white/70 px-3 py-1 rounded-full shadow-md text-lg cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      ?
    </button>
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 w-[90%] max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-center text-green-700">
              Game Instructions
            </h2>
            <div className="w-16 h-1 bg-green-300 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 text-center whitespace-pre-line leading-relaxed">
              {GAME_INSTRUCTIONS}
            </p>
            <div className="flex justify-between mt-8">
              <button
                className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 active:scale-95 transition cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition cursor-pointer"
                onClick={returnToTitle}
              >
                Return to Title
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    <div className="flex flex-row space-x-4 justify-center mb-6">
      {currentGuess.map((number, index) => (
        <NumberBox
          key={`box-${index}`}
          index={index}
          value={number}
          handleChange={(index, direction) => handleChange(index, direction)}
        />
      ))}
    </div>
    <div className="flex flex-row space-x-4 justify-center mb-6">
      <button
        className="px-4 py-2 bg-white/70 backdrop-blur-md rounded-lg shadow-md text-gray-800 
           hover:bg-white/90 active:scale-95 transition cursor-pointer
           disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed 
           disabled:hover:bg-gray-300 disabled:active:scale-100"
        onClick={handleGuess}
        disabled={gamePhase === 'win'}
      >
        Guess
      </button>
      <button
        className="px-4 py-2 bg-white/70 backdrop-blur-md rounded-lg shadow-md text-gray-800 hover:bg-white/90 active:scale-95 transition cursor-pointer"
        onClick={handleRestart}
      >
        Restart
      </button>
    </div>
    <GuessHistory history={history} />
  </div>
);

export default PlayingPage;
