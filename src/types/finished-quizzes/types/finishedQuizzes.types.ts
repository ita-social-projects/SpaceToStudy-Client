type Answer = {
  text: string
  isCorrect: boolean
  isChosen: boolean
}

type Result = {
  question: string
  answers: Answer[]
}

export type CreateFinishedQuizParams = {
  quiz: string
  grade: number
  results: Result[]
}
