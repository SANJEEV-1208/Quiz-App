import { useContext } from "react";
import { GameStateContext } from "../Helpers/Contexts";
import "../App.css";

const ScoreHistory = () => {
  const { scoreHistory, setGameState } = useContext(GameStateContext);

  return (
    <div className="ScoreHistory">
      <h2>Score History</h2>
      {scoreHistory.length === 0 ? (
        <p>No scores recorded yet.</p>
      ) : (
        <ul>
          {scoreHistory.map((entry, index) => (
            <li key={index}>
              <p>Score: {entry.score} / {entry.total}</p>
              <p>Date: {new Date(entry.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setGameState("menu")}>Back to Menu</button>
      <button onClick={() => setGameState("login")}>Back to Login Page</button>
    </div>
  );
};

export default ScoreHistory;
