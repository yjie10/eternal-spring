import { GAME_INSTRUCTIONS } from '../constants/instructions';

const StartPage = ({ startGame }) => (
  <div className="bg-gradient-to-b from-gray-100 via-amber-50 to-gray-200 flex flex-col items-center min-h-screen space-y-6 p-6">
    {/* <div className="flex flex-col items-center min-h-screen space-y-6 p-6"> */}
    <h1 className="text-4xl font-bold mb-4">Eternal Spring</h1>
    <p>{GAME_INSTRUCTIONS}</p>
    <button
      className="px-4 py-2 bg-white/70 backdrop-blur-md rounded-lg shadow-md text-gray-800 hover:bg-white/90 active:scale-95 transition cursor-pointer"
      onClick={startGame}
    >
      Start
    </button>
  </div>
);

export default StartPage;
