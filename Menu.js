import { useContext } from "react";
import { GameStateContext } from "../Helpers/Contexts";
import "../App.css";

function Menu() {
  const { setGameState, userRole } = useContext(GameStateContext); 

  return (
    <div className="Menu">
      {userRole === "student" && (
        <button onClick={() => setGameState("playing")}>Start Quiz</button>
      )}
      {userRole === "staff" && (
        <button onClick={() => setGameState("create")}>Create Quiz</button>
      )}
      <button onClick={() => setGameState("history")}>View Score History</button>
    </div>
  );
}

export default Menu;
