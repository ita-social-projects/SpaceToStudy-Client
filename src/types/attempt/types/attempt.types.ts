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

export type CreateAttemptParams = {
  quiz: string
  cooperation: string
  grade: number
  results: Result[]
}

export type UpdateAttemptParams = {
  grade: number
  results: Result[]
}

export type Attempt = CreateAttemptParams & CommonEntityFields
