const NumberBox = ({ index, value, handleChange }) => (
  <div className="flex flex-col items-center">
    <button
      className="cursor-pointer"
      onClick={() => handleChange(index, 'up')}
    >
      <img className="w-[60px] h-[60px]" src="/icons/arrow-up.svg" />
    </button>
    <button className="w-[80px] h-[80px] text-2xl border">{value}</button>
    <button
      className="cursor-pointer"
      onClick={() => handleChange(index, 'down')}
    >
      <img className="w-[60px] h-[60px]" src="/icons/arrow-down.svg" />
    </button>
  </div>
);

export default NumberBox;
