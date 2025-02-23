import type { CommonEntityFields } from '~/types'

type Answer = {
  text: string
  isCorrect: boolean
  isChosen: boolean
}

export type Result = {
  question: string
  answers: Answer[]
}

export type CreateFinishedQuizParams = {
  quiz: string
  cooperation: string
  grade: number
  results: Result[]
}

export type UpdateFinishedQuizParams = {
  grade: number
  results: Result[]
}

export type FinishedQuiz = CreateFinishedQuizParams & CommonEntityFields
