import React, { useEffect, useState } from 'react'
import './Quiz.css'
const quizData = [
    {
        question:"What is the capital of France?",
        options:["Berlin", "London", "Paris", "Madrid"],
        answer:"Paris",
    },
    {
        question:"Which language runs in a web browser?",
        options:["Java", "C", "Python", "JavaScript"],
        answer:"JavaScript",
    },
    {
        question:"What does CSS stand for?",
        options:[
          "Central Style Sheets",
          "Cascading Style Sheets",
          "Cascading Simple Sheets",
          "Cars SUVs Sailboats",
        ],
        answer:"Cascading Style Sheets",
    }
]

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(()=>{
        if(timeLeft<=0){
            handleNext();
            return;
        }
        const timer = setTimeout(()=>setTimeLeft(timeLeft-1),1000);
        return()=>clearTimeout(timer)
    }, [timeLeft])


    const handleOptionClick = option =>{
        setSelectedOption(option);
        if(option === quizData[currentQuestion].answer){
            setScore(score+1);
        }
        setTimeout(handleNext, 500);
    }

    const handleNext = () =>{
        setSelectedOption(null);
        setTimeLeft(30);
        if(currentQuestion + 1 < quizData.length){
            setCurrentQuestion(currentQuestion+1);
        }else{
            setShowResult(true)
        }
    }

    const resetQuiz = () =>{
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setTimeLeft(30);
    }
  return (
    <div className='bg-info p-5'>
      <div className='text-center'>
        {showResult ? (
          <div>
            <h2 className='text-primary hover:text-danger'>
              Your Score: {score} / {quizData.length}
            </h2>
            <button
              onClick={resetQuiz}
              className='hover'
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className='mb-2'>
              <span className='me-2'>
                Question {currentQuestion + 1} of {quizData.length}
              </span>
              <span className='fs-6'>
                Time Left: {timeLeft}s
              </span>
            </div>
            <h3 className='mb-3'>
              {quizData[currentQuestion].question}
            </h3>
            <div>
              {quizData[currentQuestion].options.map(option => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-2 me-1 rounded-lg border 
                    ${
                        selectedOption === option
                        ? option === quizData[currentQuestion].answer
                            ? 'bg-success text-white border-success'
                            : 'bg-danger text-white border-danger'
                        : 'border-secondary hover'
                    }`}
                  disabled={!!selectedOption}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
      )
}

export default Quiz