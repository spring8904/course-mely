import React from 'react'

import QuizDetail from './_components/quiz-detail'
import QuizList from './_components/quiz-list'
import Result from './_components/result'

const MeQuizzes = () => {
  return (
    <div className="section-quizzes-right">
      <div className="section-inner">
        <QuizList />
        <Result />
        <QuizDetail />
      </div>
    </div>
  )
}

export default MeQuizzes
