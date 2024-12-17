export const Square = ({ value, onClick, highlight }) => {
  const highlighted = highlight ? 'highlighted' : 'square';
  const color = value === 'X' ? 'value-x' : 'value-o';
  return (
    <button className={`${highlighted} ${color}`} onClick={onClick}>
      {value}
    </button>
  );
};
