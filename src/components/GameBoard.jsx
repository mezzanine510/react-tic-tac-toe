export default function GameBoard({ onClickCell, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={()=>onClickCell(rowIndex, colIndex)}
                                        disabled={playerSymbol}>
                                    {playerSymbol}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    );
}