import '../Styles/Gameboard.css';
export default function Gameboard({onSelect,board}){

    // const [board, setBoard] = useState(initialBoard);
    // function handleSelectSquare(rowIndex,colIndex){
    //     setBoard((prevBoard) => {
    //         const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })
    //     onSelect();
    // }

    return (
        <ol className="Gameboard">
            {board.map( (row, rowIndex) => (
                <li className="col" key={rowIndex}>
                    <ol>
                        {row.map( (playerSymbol, colIndex) => (
                            <li className='row' key={colIndex}>
                                <button className='playSquare' 
                                        onClick={()=>onSelect(rowIndex,colIndex)}
                                        disabled={playerSymbol !== null}
                                >
                                            {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}