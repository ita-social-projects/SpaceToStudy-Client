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
