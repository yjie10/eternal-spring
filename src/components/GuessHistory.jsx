const GuessHistory = ({ history }) => (
  <div>
    {history.map((entry, index) => (
      <div key={`entry-${index}`}>
        <p>{entry.guess}</p>
        <p>{entry.result}</p>
      </div>
    ))}
  </div>
);

export default GuessHistory;
