export type Params = {
  match?: string
  limit: number
}

export interface ErrorResponse {
  code: string
  message: string
  status: number
}
