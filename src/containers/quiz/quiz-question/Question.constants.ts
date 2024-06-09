import { isCorrectAnswer } from '~/utils/is-correct-answer'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'

import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'
import { Question } from '~/types'

interface GetQuestionStatusParams {
  question: Question
  answer: null | string | string[]
  shouldShowAnswersCorrectness: boolean
}

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

  const isCorrect = isAnswered && isCorrectAnswer(question, answer)

  const correctnessStatus = isCorrect
    ? AnswerStatusEnum.Correct
    : AnswerStatusEnum.Incorrect

  const answeredStatus = shouldShowAnswersCorrectness
    ? correctnessStatus
    : AnswerStatusEnum.Answered

  const shouldShowSpecificStatus = isAnswered || shouldShowAnswersCorrectness

  return shouldShowSpecificStatus ? answeredStatus : AnswerStatusEnum.Unanswered
}
