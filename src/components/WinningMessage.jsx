// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const WinningMessage = () => {
  return (
    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/80 px-8 py-6 rounded-lg shadow-lg z-30">
      <motion.h1
        className="text-3xl font-bold mb-4 text-green-700"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        You won!
      </motion.h1>
    </div>
  );
};

export default WinningMessage;
