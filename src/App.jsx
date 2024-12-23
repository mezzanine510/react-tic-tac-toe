import { useState } from "react";
import Player from './components/Player';
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [activePlayer, setActivePlayer] = useState('X');

    function handleClickCell(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            // // Used to ensure that we use the correct current player to add to the Log in based on the last turn
            // // We use this because we are calling setActivePlayer before setGameTurns in the same function
            // let currentPlayer = 'X';
            // if (prevTurns.length > 0 && prevTurns[0] === 'X') currentPlayer = 'O';
            // console.log("currentPlayer:", currentPlayer);

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
    console.log("activePlayer:", activePlayer);

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard onClickCell={handleClickCell} turns={gameTurns} />
            </div>
            <Log />
        </main>
    );
}

export default App
