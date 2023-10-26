import { Question, QuestionTypesEnum } from '~/types'

export const initialValues = (question?: Question) => {
  const initialAnswers = (question?.answers ?? []).map((answer, index) => ({
    ...answer,
    id: index
  }))

  return {
    type: question?.type ?? QuestionTypesEnum.MultipleChoice,
    title: question?.title ?? '',
    text: question?.text ?? '',
    answers: initialAnswers,
    openAnswer: '',
    category: question?.category?._id ?? null
  }
}
