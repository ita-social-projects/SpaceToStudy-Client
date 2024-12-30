import { type ErrorResponse } from '~/types'

class ResponseError extends Error {
  code?: string
  status?: number

  constructor({ code, message, status }: Partial<ErrorResponse>) {
    super(message)

    this.code = code
    this.status = status
  }
}

export { ResponseError }
