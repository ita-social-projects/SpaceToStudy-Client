import { TFunction } from 'i18next'

import { QuizViewEnum, QuizTimeLimit } from '~/types'

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

export const getQuizTimeLimitFields = (t: TFunction) => [
  {
    value: QuizTimeLimit.NoLimit,
    title: t('myResourcesPage.quizzes.types.NoLimit')
  },
  {
    value: QuizTimeLimit.Minute15,
    title: t('myResourcesPage.quizzes.types.Minute15')
  },
  {
    value: QuizTimeLimit.Minute30,
    title: t('myResourcesPage.quizzes.types.Minute30')
  },
  {
    value: QuizTimeLimit.Minute45,
    title: t('myResourcesPage.quizzes.types.Minute45')
  },
  {
    value: QuizTimeLimit.Hour1,
    title: t('myResourcesPage.quizzes.types.Hour1')
  }
]
