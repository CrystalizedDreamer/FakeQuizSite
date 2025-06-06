import { useState, useMemo, } from "react";
// there wound up being more functions and states than I mentally 
//had prepared for, but overall I think it turned out well.
export function QuizBoard({ fadeIn, quizData, onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const questions = quizData.questions;
  const questionObj = questions[currentQuestion];
  const [showFeedback, setShowFeedback] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(null);
  const allAnswers = useMemo(() => {
    if (!questionObj) return [];
    return [
      questionObj.correct_answer,
      ...questionObj.incorrect_answers
    ].sort(() => Math.random() - 0.5);
  }, [questionObj]);

  // Show results if quiz is finished
  if (currentQuestion >= questions.length) {
    const score = userAnswers.filter(
      (ans, i) => ans === questions[i].correct_answer
    ).length;

    return (
      <div className={`quizBoard${fadeIn ? ' fade-in' : ''}`}>
        <h2>Quiz Complete!</h2>
        <p>Your score: {score} / {questions.length}</p>
        <button onClick={onReset} className="start-quiz-button">
          Restart Quiz
        </button>
      </div>
    );
  }

 function handleSubmit(e) {
  e.preventDefault();
  if (!selectedAnswer) {
    alert("Please select an answer before submitting.");
    return;
  }
  setUserAnswers([...userAnswers, selectedAnswer]);
  setWasCorrect(selectedAnswer === questionObj.correct_answer);
  setShowFeedback(true);
}
function handleNext() {
  setCurrentQuestion(currentQuestion + 1);
  setSelectedAnswer("");
  setShowFeedback(false);
  setWasCorrect(null);
}

  return (
  <div className={`quizBoard${fadeIn ? ' fade-in' : ''}`}>
    <h2>Question {currentQuestion + 1}</h2>
    <p dangerouslySetInnerHTML={{ __html: questionObj.question }} />

    {showFeedback ? (
      <div>
        {wasCorrect ? (
          <p style={{ color: "limegreen" }}>Correct!</p>
        ) : (
          <p style={{ color: "crimson" }}>
            Incorrect. The correct answer was:{" "}
            <span dangerouslySetInnerHTML={{ __html: questionObj.correct_answer }} />
          </p>
        )}
        <button onClick={handleNext} className="start-quiz-button" style={{ marginTop: "1em" }}>
          Next
        </button>
      </div>
    ) : (
        //I originally had not made the form with radio buttons,
        // but then I read the rubric again and started punching the air, and went back to fix it.
<form onSubmit={handleSubmit} className="answer-options">
        {allAnswers.map((answer, index) => (
          <label key={index} style={{ marginBottom: "0.5em" }}>
            <input
              type="radio"
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => setSelectedAnswer(answer)}
            />
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </label>
        ))}
        <button type="submit" className="start-quiz-button" style={{ marginTop: "1em" }}>
          Submit Answer
        </button>
      </form>
      // I was THISSS close to sending the whole thing back to the homepage
      //and making the user start over that way, as functionally the user wouldn't know, since cookies aren't employed here
      // but I would know, and I would feel bad about it. I can't even lie, CoPilot absolutely carried me for this particular functionality.
    )}
  </div>
)};