import { createContext, useState, useEffect } from "react";

export const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState("login");
  const [userRole, setUserRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  });
  const [scoreHistory, setScoreHistory] = useState([]);

  // Load stored questions when the app starts
  useEffect(() => {
    const storedQuestions = localStorage.getItem("quizQuestions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }

    const storedScores = localStorage.getItem("scoreHistory");
    if (storedScores) {
      setScoreHistory(JSON.parse(storedScores));
    }
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("quizQuestions", JSON.stringify(questions));
    }
  }, [questions]);

  // Save score history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
  }, [scoreHistory]);

  // Handle input changes in CreateQuiz.js
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new question to the list
  const addQuestion = () => {
    if (newQuestion.prompt && newQuestion.answer) {
      setQuestions((prev) => [...prev, { id: prev.length + 1, ...newQuestion }]);
      setNewQuestion({ prompt: "", optionA: "", optionB: "", optionC: "", optionD: "", answer: "" }); // Reset form
    }
  };

  
  const addScoreToHistory = (score, total) => {
    const newScore = { score, total, date: new Date().toLocaleString() };
    setScoreHistory((prev) => [...prev, newScore]);
  };

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        userRole,
        setUserRole,
        setQuestions,
        questions,
        newQuestion,
        handleInputChange,
        addQuestion,
        scoreHistory, 
        addScoreToHistory, 
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
