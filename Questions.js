import { useState } from "react";

const Questions = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      prompt: "What is my name?",
      optionA: "John",
      optionB: "Jake",
      optionC: "Josh",
      optionD: "Pedro",
      answer: "optionD",
    },
    {
      id: 2,
      prompt: "Which of these is not a programming language?",
      optionA: "Python",
      optionB: "JavaScript",
      optionC: "MC-03",
      optionD: "Java",
      answer: "optionC",
    },
  ]);

  const emptyQuestion = {
    prompt: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  };

  const [newQuestion, setNewQuestion] = useState(emptyQuestion);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const addQuestion = () => {
    if (!newQuestion.prompt || !newQuestion.answer) return;
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    setNewQuestion(emptyQuestion);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const editQuestion = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setNewQuestion(questionToEdit);
    setEditingId(id);
  };

  const updateQuestion = () => {
    setQuestions(questions.map((q) => (q.id === editingId ? { ...newQuestion, id: editingId } : q)));
    setEditingId(null);
    setNewQuestion(emptyQuestion);
  };

  return {
    questions,
    newQuestion,
    editingId,
    handleInputChange,
    addQuestion,
    deleteQuestion,
    editQuestion,
    updateQuestion,
  };
};

export default Questions;
