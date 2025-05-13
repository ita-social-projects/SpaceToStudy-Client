import { checkAnswerCorrectness } from '~/utils/is-correct-answer'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'

import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'
import { Question } from '~/types'
import { ResponseError } from '~/exceptions'

interface GetQuestionStatusParams {
  question: Question
  answer: null | string | string[]
  shouldShowAnswersCorrectness: boolean
}

export const CORRECT_ANSWER_POINTS = '1/1'
export const INCORRECT_ANSWER_POINTS = '0/1'

export const getQuestionStatus = ({
  answer,
  question,
  shouldShowAnswersCorrectness
}: GetQuestionStatusParams) => {
  const { isOpenAnswer } = determineQuestionType(question.type)

  if (isOpenAnswer && shouldShowAnswersCorrectness)
    return AnswerStatusEnum.Correct

  const isMultipleChoiceAnswered = Array.isArray(answer) ? answer.length : true

  const isAnswered = Boolean(answer) && isMultipleChoiceAnswered

  const isCorrect = isAnswered && checkAnswerCorrectness(question, answer)

  const correctnessStatus = isCorrect
    ? AnswerStatusEnum.Correct
    : AnswerStatusEnum.Incorrect

  const answeredStatus = shouldShowAnswersCorrectness
    ? correctnessStatus
    : AnswerStatusEnum.Answered

  const shouldShowSpecificStatus = isAnswered || shouldShowAnswersCorrectness

  return shouldShowSpecificStatus ? answeredStatus : AnswerStatusEnum.Unanswered
}

export const QuizErrors = {
  QUIZ_NOT_FOUND_TO_UPDATE: new ResponseError({
    status: 404,
    code: 'QUIZ_NOT_FOUND_TO_UPDATE',
    message: 'Quiz not found to update.'
  })
}
