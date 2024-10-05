import { useState } from "react";
import '../Styles/Player.css';

export default function Player({name,symbol,isActive,onNameChange}){
    const [edit, setEdit] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    function handleChange(evt){
        setPlayerName(evt.target.value);
    }
    function handleEditClick(){
      setEdit((e)=>!e);
      if (edit){
        onNameChange(symbol,playerName);
      }
    }
    return (
        <li id="player" className={isActive?"active":undefined}>
          <span>
            {!edit && <span className="playerName">{playerName}</span>}
            {edit && <input type="text" value={playerName} onChange={handleChange} required/>}
            <span className="playerSymbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{edit?"save":"edit"}</button>
        </li>
    );
}