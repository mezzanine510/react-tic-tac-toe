import { useState } from "react";
import Player from './components/Player';
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS} from "./winning-combinations.js";


const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [activePlayer, setActivePlayer] = useState('X');

    // Deep copy the initial game board
    let gameBoard = [...initialGameBoard.map(row => [...row])];

    for (const turn of gameTurns) {
        const { cell, player } = turn;
        const { row, col } = cell;

        gameBoard[row][col] = player;
    }

    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
        const symbols = combination.map(
            ({ row, column }) => gameBoard[row][column]
        );

        if (symbols.every((symbol) => symbol && symbol === symbols[0])) {
            winner = symbols[0];
        }
    }

    if (winner) {
        console.log(`Player ${activePlayer} wins!`);
    }

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleClickCell(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            const updatedTurns = [
                {
                    cell: { row: rowIndex, col: colIndex },
                    player: activePlayer
                },
                ...prevTurns
            ];
            return updatedTurns;
        });

        setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
    }

    function handleRestart() {
        setGameTurns([]);
        setActivePlayer('X');
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
                <GameBoard onClickCell={handleClickCell} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App
