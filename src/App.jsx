import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Player from "./components/Player"
import './index.css';
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombinations";
import Gameover from "./components/Gameover";


function App() {
  // const [activeplayer, setActiveplayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X:'Player1',
    O:'Player2'
  });

  function deriveActivePlayers(gameTurns){
    let currPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
          currPlayer = 'O';
        }
    return currPlayer;    
  }
  const activeplayer = deriveActivePlayers(gameTurns);

  const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  let gameBoard = [ ...initialBoard.map( array => [...array] )];
  for (let turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
    }

  function deriveWinner(gameBoard,players){
    let winner;
    for (let combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
      if (firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ){
      winner = players[firstSquareSymbol];
      }
    } 
    return winner;
  }
  const winner = deriveWinner(gameBoard,players);

  const drawSituation = gameTurns.length===9 && !winner ; 

  function handleActiveplayer(rowIndex, colIndex) {
    // setActiveplayer((currVal) => currVal === 'X' ? 'O' : 'X');
    setGameTurns((prevTurn) => {
      const activeplayer = deriveActivePlayers(prevTurn);
      const updatedTurns = [{
        square: { row: rowIndex, col: colIndex },
        player: activeplayer
      }, ...prevTurn];
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerName(symbol,newName){
    setPlayers( prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    })
  }

  return (
    <>
      <div className="playingArena">
        {(winner || drawSituation) && 
          <Gameover winner={winner} onRestart={handleRestart}/>}
        <ol>
          <Player name="Player1" symbol="X" 
          isActive={activeplayer === 'X'} onNameChange={handlePlayerName}/>
          <Player name="Player2" symbol="O" 
          isActive={activeplayer === 'O'} onNameChange={handlePlayerName}/>
        </ol>
        <Gameboard onSelect={handleActiveplayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </>

  )
}

      export default App