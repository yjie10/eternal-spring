const NumberBox = ({ index, value, handleChange }) => (
  <div>
    <button onClick={() => handleChange(index, 'up')}>↑</button>
    <button>{value}</button>
    <button onClick={() => handleChange(index, 'down')}>↓</button>
  </div>
);

export default NumberBox;
