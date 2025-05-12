import { Answer, QuestionTypesEnum } from '~/types'

export const formatQuizResults = (
  data: Record<string, string | string[]>,
  items: {
    _id: string
    text: string
    type: QuestionTypesEnum
    answers: Answer[]
  }[]
) => {
  const getOpenAnswer = (_id: string) => {
    const value = Array.isArray(data[_id]) ? data[_id][0] : data[_id]
    return value
      ? [
          {
            text: value,
            isCorrect: false,
            isChosen: true
          }
        ]
      : []
  }

  const getClosedAnswers = (_id: string, answers: Answer[]) => {
    const answerValue = data[_id]
    return answers.map(({ text, isCorrect }) => ({
      text,
      isCorrect,
      isChosen: Array.isArray(answerValue)
        ? answerValue.includes(text)
        : answerValue === text
    }))
  }

  return items.map(({ _id, text, type, answers }) => ({
    question: text,
    answers:
      type === QuestionTypesEnum.OpenAnswer
        ? getOpenAnswer(_id)
        : getClosedAnswers(_id, answers)
  }))
}
