import { useEffect, useState } from 'react'
import { checkAnswerCorrectness } from '~/utils/is-correct-answer'
import { getFirstAnswer } from '~/utils/get-first-answer'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { ResourceService } from '~/services/resource-service'
import useQuery from '~/hooks/use-query'
import { Question } from '~/types'

export function useAnswerCorrectness(
  attemptId: string,
  question: Question,
  value: string | string[] | null
) {
  const initialIsCorrect = checkAnswerCorrectness(question, value)
  const { isOpenAnswer } = determineQuestionType(question.type)

  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(
    undefined
  )

  const getFinishedQuiz = () => {
    return ResourceService.getFinishedQuiz(attemptId)
  }

  const { data: finishedQuiz, isLoading: isFinishedQuizLoading } = useQuery({
    queryKey: ['finished-quizzes', attemptId],
    queryFn: getFinishedQuiz
  })

  useEffect(() => {
    if (!isOpenAnswer) {
      setIsAnswerCorrect(initialIsCorrect)
      return
    }

    if (finishedQuiz && !isFinishedQuizLoading) {
      const firstAnswer = getFirstAnswer(finishedQuiz.results, question.text)
      if (firstAnswer) {
        setIsAnswerCorrect(firstAnswer.isCorrect)
      }
    }
  }, [
    finishedQuiz,
    isFinishedQuizLoading,
    isOpenAnswer,
    question.text,
    initialIsCorrect
  ])

  return {
    isOpenAnswer,
    isAnswerCorrect,
    setIsAnswerCorrect
  }
}
