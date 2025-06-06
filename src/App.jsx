import { useState } from 'react'
import React from 'react'
import './App.css'
import {Navbar} from './assets/Scripts/Navbar.jsx'
import {Playboard} from './assets/Scripts/Playboard.jsx'
import {QuizBoard} from './assets/Scripts/QuizBoard.jsx'

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizFadeIn, setQuizFadeIn] = useState(false)
  const [quizData, setQuizData] = useState(null)

function handleStartQuiz(data) {
   console.log("Quiz started! Data:", data); 
    setQuizData(data)
    setQuizStarted(true)
    setQuizFadeIn(false)
    setTimeout(() => setQuizFadeIn(true), 10) 
  }

function handleResetQuiz() {
    setQuizStarted(false)
    setQuizFadeIn(false)
    setQuizData(null)
  }

  return (
    <div className="App"> 
    <Navbar />
    {!quizStarted && <Playboard onStartQuiz={handleStartQuiz} />}
    {quizStarted && quizData && 
    <QuizBoard fadeIn={quizFadeIn} quizData={quizData} onReset={handleResetQuiz} />}
    </div>
  )
}

export default App
