import { calculateWinner } from '../../utils/calculate-winner';
import { useState, useEffect, useRef } from 'react';
import { Board } from '../board';

export const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');
  const [current, setCurrent] = useState({});
  const [moves, setMoves] = useState(null);
  const [stepNumber, setStepNumber] = useState(0);
  const [winnerRows, setWinnerRows] = useState([]);
  const backInTime = useRef(false);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentBoard = newHistory[newHistory.length - 1];
    const squares = currentBoard.squares.slice();
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext((prevValue) => !prevValue);
    setWinnerRows([]);
    backInTime.current = false;
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    backInTime.current = true;
  };

  useEffect(() => {
    setCurrent(history[stepNumber]);
    setMoves(
      history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button className={`timeTravelBtn`} onClick={() => jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
      })
    );
  }, [history, xIsNext, stepNumber]);

  useEffect(() => {
    const [winner, rows] = calculateWinner(current.squares);
    rows && setWinnerRows(rows);

    if (winner) {
      setStatus(`The winner is: ${winner}`);
    } else if (moves?.length === 10 && !backInTime.current) {
      setStatus(`It's a draw`);
    } else {
      setStatus(`It's ${xIsNext ? 'X' : 'O'}'s turn`);
    }
  }, [current, moves, xIsNext]);

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} highlight={winnerRows} onClick={(i) => handleClick(i)} />
      </div>
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ul className='list'>{moves}</ul>
      </div>
    </div>
  );
};
