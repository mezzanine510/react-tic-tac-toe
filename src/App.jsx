import { useState } from "react";
import Player from './components/Player';
import GameBoard from "./components/GameBoard.jsx";

function App() {
    const [activePlayer, setActivePlayer] = useState('X');

    function handleSelectCell() {
        setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
    }
    console.log(activePlayer);

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard onClickCell={handleSelectCell} activePlayerSymbol={activePlayer}/>
            </div>
        </main>
    );
}

export default App
