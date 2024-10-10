import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, SetGameTurns] = useState([]);
  // const [activePlayer, SetActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBorad = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBorad[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    // const firstSquareSymbol;
    // const secondSquareSymbol;
    // const thirdSquareSymbol;
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // SetActivePlayer((CurActivePlayer) => (CurActivePlayer === "X" ? "O" : "X"));
    SetGameTurns((prevTurns) => {
      // let currentPlayer = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          borad={gameBorad}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
