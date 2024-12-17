import { Square } from '../square';

export const Board = ({ squares, onClick, highlight }) => {
  const renderSquare = (i) => {
    const winnerSquare = highlight.some((item) => item === i);
    return (
      <Square key={i} value={squares[i]} highlight={winnerSquare} onClick={() => onClick(i)} />
    );
  };

  return (
    <div>
      {squares && (
        <>
          <div className='board-row'>
            {squares.slice(0, 3).map((squeare, i) => renderSquare(i))}
          </div>
          <div className='board-row'>
            {squares.slice(3, 6).map((squeare, i) => renderSquare(i + 3))}
          </div>
          <div className='board-row'>
            {squares.slice(6).map((squeare, i) => renderSquare(i + 6))}
          </div>
        </>
      )}
    </div>
  );
};
