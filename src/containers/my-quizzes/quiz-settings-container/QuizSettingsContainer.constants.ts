import { TFunction } from 'i18next'

import { QuizViewEnum, QuizTimeLimit, QuizAttempt } from '~/types'

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
    title: t('myResourcesPage.quizzes.types.noLimit')
  },
  {
    value: QuizTimeLimit.Minute15,
    title: t('myResourcesPage.quizzes.types.minute15')
  },
  {
    value: QuizTimeLimit.Minute30,
    title: t('myResourcesPage.quizzes.types.minute30')
  },
  {
    value: QuizTimeLimit.Minute45,
    title: t('myResourcesPage.quizzes.types.minute45')
  },
  {
    value: QuizTimeLimit.Hour1,
    title: t('myResourcesPage.quizzes.types.hour1')
  }
]

export const getQuizAttemptFields = (t: TFunction) => [
  {
    value: QuizAttempt.NoLimit,
    title: t('myResourcesPage.quizzes.types.noLimit')
  },
  {
    value: QuizAttempt.Attempt1,
    title: t('myResourcesPage.quizzes.types.attempt1')
  },
  {
    value: QuizAttempt.Attempt2,
    title: t('myResourcesPage.quizzes.types.attempt2')
  },
  {
    value: QuizAttempt.Attempt3,
    title: t('myResourcesPage.quizzes.types.attempt3')
  },
  {
    value: QuizAttempt.Attempt5,
    title: t('myResourcesPage.quizzes.types.attempt5')
  },
  {
    value: QuizAttempt.Attempt10,
    title: t('myResourcesPage.quizzes.types.attempt10')
  }
]
