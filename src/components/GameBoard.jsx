const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBorad = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBorad[row][col] = player;
  }

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
      {gameBorad.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
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
