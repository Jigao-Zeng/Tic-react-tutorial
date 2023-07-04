import React from 'react';
import { useState } from 'react';

function Square({ symbol, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {symbol}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  const handleSquareClick = (i) => {
    const squaresCopy = squares.slice();
    if (squaresCopy[i] || calculateWinner(squares)) {
      return;
    }

    if (xIsNext) {
      squaresCopy[i] = 'X';
    } else {
      squaresCopy[i] = 'O';
    }

    onPlay(squaresCopy);
  };

  const winner = calculateWinner(squares);
  let status = 'hihih';
  if (winner) {
    status = 'The Winner Is : ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square
            symbol={squares[0]}
            onSquareClick={() => handleSquareClick(0)}
          />
          <Square
            symbol={squares[1]}
            onSquareClick={() => handleSquareClick(1)}
          />
          <Square
            symbol={squares[2]}
            onSquareClick={() => handleSquareClick(2)}
          />
        </div>
        <div className="board-row">
          <Square
            symbol={squares[3]}
            onSquareClick={() => handleSquareClick(3)}
          />
          <Square
            symbol={squares[4]}
            onSquareClick={() => handleSquareClick(4)}
          />
          <Square
            symbol={squares[5]}
            onSquareClick={() => handleSquareClick(5)}
          />
        </div>
        <div className="board-row">
          <Square
            symbol={squares[6]}
            onSquareClick={() => handleSquareClick(6)}
          />
          <Square
            symbol={squares[7]}
            onSquareClick={() => handleSquareClick(7)}
          />
          <Square
            symbol={squares[8]}
            onSquareClick={() => handleSquareClick(8)}
          />
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  console.log({ history });

  const moves = history.map((squares, move) => {
    console.log({ squares }, { move });
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
