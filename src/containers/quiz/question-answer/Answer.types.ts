export enum AnswerStatusEnum {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Answered = 'answered',
  Unanswered = 'unanswered'
}

export type AnswerCorrectnessStatus =
  | AnswerStatusEnum.Correct
  | AnswerStatusEnum.Incorrect
export type AnswerCompletionStatus =
  | AnswerStatusEnum.Answered
  | AnswerStatusEnum.Unanswered

export type AnswerStatus = AnswerCorrectnessStatus | AnswerCompletionStatus
