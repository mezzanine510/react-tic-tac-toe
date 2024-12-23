export default function Log({turns}) {
    return (
        <ol id="log">
            <h2>Turns Log</h2>
            {turns.map((turn) => (
                <li key={`${turn.cell.row}${turn.cell.col}`}>
                    {turn.player} selected {turn.cell.row + 1}, {turn.cell.col + 1}
                </li>
            ))}
        </ol>
    );
}