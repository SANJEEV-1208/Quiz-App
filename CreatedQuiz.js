import { useContext, useState, useEffect } from "react";
import { GameStateContext } from "../Helpers/Contexts";
import "../App.css";

const CreatedQuiz = () => {
  const { questions, setQuestions, addScoreToHistory, setGameState } = useContext(GameStateContext);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelection = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  useEffect(() => {
    const storedQuestions = localStorage.getItem("quizQuestions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, [setQuestions]);
  

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    addScoreToHistory(totalScore, questions.length);
  };

  return (
    <div className="CreatedQuiz">
      <h2>Quiz</h2>

      {score === null ? (
        <>
          <div className="question-container">
            <p>{questions[currentQuestionIndex].prompt}</p>
            <div className="options">
              {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
                <div key={opt}>
                  <input
                    type="radio"
                    id={`${questions[currentQuestionIndex].id}-${opt}`}
                    name={`question-${questions[currentQuestionIndex].id}`}
                    value={opt}
                    checked={userAnswers[questions[currentQuestionIndex].id] === opt}
                    onChange={() => handleAnswerSelection(questions[currentQuestionIndex].id, opt)}
                  />
                  <label htmlFor={`${questions[currentQuestionIndex].id}-${opt}`}>
                    {questions[currentQuestionIndex][opt]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Next</button>
            ) : (
              <button onClick={calculateScore}>Submit Quiz</button>
            )}
          </div>
        </>
      ) : (
        <div className="score-container">
          <h3 className="score-text">Your Score: {score} / {questions.length}</h3>
          <button onClick={() => setGameState("history")}>View Score History</button>
        </div>
      )}
    </div>
  );
};

export default CreatedQuiz;
