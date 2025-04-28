const GuessHistory = ({ history }) => (
  <table className="table-fixed w-[50%] border-collapse">
    <thead>
      <tr>
        <th className="w-[20%] px-4 py-2">#</th>
        <th className="w-[40%] px-4 py-2">Your Guess</th>
        <th className="w-[40%] px-4 py-2">Result</th>
      </tr>
    </thead>
    <tbody>
      {history.map((entry, index) => (
        <tr key={`entry-${index}`}>
          <td className="px-4 py-2 text-center">{index + 1}</td>
          <td className="px-4 py-2 text-center">{entry.guess}</td>
          <td className="px-4 py-2 text-center">{entry.result}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default GuessHistory;
