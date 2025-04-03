import React from "react";
import "../App.css";
import { useContext } from "react";
import { GameStateContext } from "../Helpers/Contexts";
import Questions from "../Helpers/Questions";

const EndScreen = () => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );

  const restartQuiz = () => {
    setScore(0);
    setGameState("login");
  };
  return (
    <div className="EndScreen">
      <h1>Quiz Finished</h1>
      <h3>{userName}</h3>
      <h1>
        {score} / {Questions.length}
      </h1>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default EndScreen;