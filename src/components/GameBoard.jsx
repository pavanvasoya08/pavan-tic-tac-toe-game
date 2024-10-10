

export default function GameBoard({ onSelectSquare, board }) {


  // const [gameBorad, SetGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   SetGameBoard((prevGameBorad) => {
  //     const updateGameBorad = [
  //       ...prevGameBorad.map((innerArray) => [...innerArray]),
  //     ];
  //     updateGameBorad[rowIndex][colIndex] = activePlayerSymbol;
  //     return updateGameBorad;
  //   });
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {borad.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
