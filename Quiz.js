import { useContext, useState } from "react";
import { GameStateContext } from "../Helpers/Contexts";

function Quiz() {
  const { questions } = useContext(GameStateContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { score, setScore, setGameState } = useContext(GameStateContext);

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    if (questions[currentQuestion].answer === optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (questions[currentQuestion].answer === optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      <h1>{questions[currentQuestion]?.prompt}</h1>
      <div className="questions">
        {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
          <button key={opt} onClick={() => chooseOption(opt)}>
            {questions[currentQuestion]?.[opt]}
          </button>
        ))}
      </div>

      {currentQuestion === questions.length - 1 ? (
        <button onClick={finishQuiz}>Finish Quiz</button>
      ) : (
        <button onClick={nextQuestion}>Next Question</button>
      )}
    </div>
  );
}

export default Quiz;
