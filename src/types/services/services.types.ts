export type Params = {
  name?: string
  limit: number
  skip: number
  sort: Sort
}

export interface ErrorResponse {
  code: string
  message: string
  status: number
}
