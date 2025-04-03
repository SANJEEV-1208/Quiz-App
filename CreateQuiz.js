import { useContext, useState } from "react";
import { GameStateContext } from "../Helpers/Contexts";
import "../App.css";

const CreateQuiz = () => {
  const {
    questions,
    newQuestion,
    handleInputChange,
    addQuestion,
    setGameState, 
  } = useContext(GameStateContext);
  
  const [quizCreated, setQuizCreated] = useState(false); 

  return (
    <div className="CreateQuiz">
      {!quizCreated ? (
        <>
          <h2>Questions List</h2>
          {questions.length === 0 ? (
            <p>No questions added yet.</p>
          ) : (
            questions.map((q) => (
              <div key={q.id}>
                <p><strong>Q:</strong> {q.prompt}</p>
                <p>A: {q.optionA}</p>
                <p>B: {q.optionB}</p>
                <p>C: {q.optionC}</p>
                <p>D: {q.optionD}</p>
                <p><strong>Answer:</strong> {q.answer}</p>
              </div>
            ))
          )}

          <h2>Add New Question</h2>
          <input type="text" name="prompt" value={newQuestion.prompt} onChange={handleInputChange} placeholder="Enter question" />
          <input type="text" name="optionA" value={newQuestion.optionA} onChange={handleInputChange} placeholder="Option A" />
          <input type="text" name="optionB" value={newQuestion.optionB} onChange={handleInputChange} placeholder="Option B" />
          <input type="text" name="optionC" value={newQuestion.optionC} onChange={handleInputChange} placeholder="Option C" />
          <input type="text" name="optionD" value={newQuestion.optionD} onChange={handleInputChange} placeholder="Option D" />
          <input type="text" name="answer" value={newQuestion.answer} onChange={handleInputChange} placeholder="Correct Option (e.g., optionA)" />

          <div className="button-group">
            <button onClick={addQuestion}>Add Question</button>
            <button
              onClick={() => {
                addQuestion(); 
                setQuizCreated(true); 
              }}
            >
              Start Quiz
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Quiz Created!</h2>
          {questions.map((q) => (
            <div key={q.id}>
              <p><strong>Q:</strong> {q.prompt}</p>
              <p>A: {q.optionA}</p>
              <p>B: {q.optionB}</p>
              <p>C: {q.optionC}</p>
              <p>D: {q.optionD}</p>
              <p><strong>Answer:</strong> {q.answer}</p>
            </div>
          ))}

          <div className="button-group">
            <button onClick={() => setQuizCreated(false)}>Back to Create Quiz</button>
            <button onClick={() => setGameState("login")}>Back to Login Page</button> 
          </div>
        </>
      )}
    </div>
  );
};

export default CreateQuiz;
