import { TFunction } from 'i18next'

import { QuizViewEnum } from '~/types'

export const getQuizViewFields = (t: TFunction) => [
  {
    value: QuizViewEnum.Scroll,
    title: t('myResourcesPage.quizzes.types.scroll')
  },
  {
    value: QuizViewEnum.Stepper,
    title: t('myResourcesPage.quizzes.types.stepper')
  }
]
