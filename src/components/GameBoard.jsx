const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onClickCell, turns }) {
    let gameBoard = initialGameBoard;

    for (const turn of turns) {
        const { cell, player } = turn;
        const { row, col } = cell;

        gameBoard[row][col] = player;
    }
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    //
    // function handleClickCell(rowIndex, colIndex) {
    //     setGameBoard((previousGameBoard) => {
    //         const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     });
    //
    //     onClickCell();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={()=>onClickCell(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    );
}