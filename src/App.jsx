import {useState} from "react";
import Player from './components/Player';
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import {INITIAL_GAME_BOARD, PLAYERS} from "./GAME_CONSTANTS.js";


// Deep copy the initial game board
function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

    for (const turn of gameTurns) {
        const {cell, player} = turn;
        const {row, col} = cell;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
        const symbols = combination.map(
            ({row, column}) => gameBoard[row][column]
        );

        if (symbols.every((symbol) => symbol && symbol === symbols[0])) {
            winner = players[symbols[0]];
        }
    }

    return winner;
}


function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);
    const [activePlayer, setActivePlayer] = useState('X');

    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleClickCell(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            const updatedTurns = [
                {
                    cell: {row: rowIndex, col: colIndex},
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

    function handlePlayerNameChange(symbol, newName) {
        setPlayers((prevPlayers) => {

            return {
                ...prevPlayers,
                [symbol]: newName
            }
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === 'O'}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard onClickCell={handleClickCell} board={gameBoard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    );
}

export default App
