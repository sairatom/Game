import '../Styles/Gameover.css';
export default function Gameover({winner, onRestart}){
    return(
        <div className="Gameover">
            <h2>Game Over!</h2>
            {winner && <p>{winner} Won!</p>}
            {!winner && <p>It's a tie!</p>}
            <p><button onClick={onRestart}>Rematch</button></p>
        </div>
    );
}