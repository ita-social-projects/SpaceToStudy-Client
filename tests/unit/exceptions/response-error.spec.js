import { describe, it, expect } from 'vitest'
import { ResponseError } from '~/exceptions'

describe('ResponseError', () => {
  it('should create ResponseError exception with all options', () => {
    const errorData = {
      code: 'UNKNOWN_ERROR',
      message: 'UNKNOWN_ERROR_MESSAGE',
      status: 400
    }

    const error = new ResponseError(errorData)

    expect(error).toBeInstanceOf(ResponseError)
    expect(error.message).toBe(errorData.message)
    expect(error.code).toBe(errorData.code)
    expect(error.status).toBe(errorData.status)
  })

  it('should create ResponseError exception with required options', () => {
    const errorData = {
      message: 'UNKNOWN_ERROR_MESSAGE'
    }

    const error = new ResponseError(errorData)

    expect(error).toBeInstanceOf(ResponseError)
    expect(error.message).toBe(errorData.message)
    expect(error.code).toBeUndefined()
    expect(error.status).toBeUndefined()
  })

  it('should be instance of default Error exception', () => {
    const errorData = {
      message: 'UNKNOWN_ERROR_MESSAGE'
    }

    const error = new ResponseError(errorData)

    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('Error')
  })
})
