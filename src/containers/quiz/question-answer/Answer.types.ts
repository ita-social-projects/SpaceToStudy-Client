export type AnswerCorrectnessStatus = 'correct' | 'incorrect'
export type AnswerCompletionStatus = 'answered' | 'unanswered'

export type AnswerStatus = AnswerCorrectnessStatus | AnswerCompletionStatus

export enum AnswerStatusEnum {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Answered = 'answered',
  Unanswered = 'unanswered'
}
