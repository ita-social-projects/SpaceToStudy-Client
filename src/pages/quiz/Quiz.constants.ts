import { Question, QuestionTypesEnum } from '~/types'

export const countPoints = (
  questions: Question[],
  answers: Record<string, string | string[]>
) => {
  const result = questions.map((item) => {
    const userAnswer = answers[item._id]
    if (!userAnswer) return false

    if (
      item.type === QuestionTypesEnum.MultipleChoice &&
      Array.isArray(userAnswer)
    ) {
      const correctAnswers = item.answers.filter((item) => item.isCorrect)

      return (
        userAnswer.every((item) =>
          correctAnswers.find((i) => i.text === item)
        ) && userAnswer.length === correctAnswers.length
      )
    } else if (item.type === QuestionTypesEnum.OneAnswer) {
      return item.answers.find((item) => item.isCorrect)?.text === userAnswer
    } else {
      return true
    }
  })

  const points = result.reduce((acc, item) => (item ? acc + 1 : acc), 0)

  return points
}
