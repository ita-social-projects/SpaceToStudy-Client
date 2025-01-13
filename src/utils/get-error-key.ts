import { type ResponseError } from '~/exceptions'
interface ErrorResponse {
  code: string
}

export const getErrorKey = (error?: ErrorResponse | ResponseError) =>
  `errors.${error?.code ? error.code : 'UNKNOWN_ERROR'}`
