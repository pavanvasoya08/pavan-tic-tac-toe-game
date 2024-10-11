import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYER = { X: "Player 1", O: "Player 2" };

const INITIAL_GMAE_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBorad(gameTurns) {
  let gameBorad = [...INITIAL_GMAE_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBorad[row][col] = player;
  }
  return gameBorad;
}

function deriveWinner(gameBorad, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBorad[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBorad[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBorad[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, SetPlayers] = useState(PLAYER);
  const [gameTurns, SetGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBorad = deriveGameBorad(gameTurns);
  const winner = deriveWinner(gameBorad, players);
  const hasDrow = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    SetGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  function handleRestart() {
    SetGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    SetPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYER.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDrow) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

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
