import { isCorrectAnswer } from '~/utils/is-correct-answer'
import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'
import { Question } from '~/types'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'

interface GetQuestionStatusParams {
  question: Question
  answer: null | string | string[]
  showAnswersCorrectness: boolean
}

export const getQuestionStatus = ({
  answer,
  question,
  showAnswersCorrectness
}: GetQuestionStatusParams) => {
  const { isOpenAnswer } = determineQuestionType(question.type)

  if (isOpenAnswer && showAnswersCorrectness) return AnswerStatusEnum.Correct

  const isMultipleChoiceAnswered = Array.isArray(answer) ? answer.length : true

  const isAnswered = Boolean(answer) && isMultipleChoiceAnswered

  const isCorrect = isAnswered && isCorrectAnswer(question, answer)

  const correctnessStatus = isCorrect
    ? AnswerStatusEnum.Correct
    : AnswerStatusEnum.Incorrect

  const answeredStatus = showAnswersCorrectness
    ? correctnessStatus
    : AnswerStatusEnum.Answered

  const shouldShowSpecificStatus = isAnswered || showAnswersCorrectness

  return shouldShowSpecificStatus ? answeredStatus : AnswerStatusEnum.Unanswered
}
