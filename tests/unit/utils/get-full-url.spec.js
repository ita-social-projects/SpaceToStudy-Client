import { describe, expect, it } from 'vitest'

import { getFullUrl } from '~/utils/helper-functions'

const URL_WITH_SINGLE_PARAMETER_IN_THE_END = '/resources/:id'
const URL_WITH_SINGLE_PARAMETER_IN_THE_MIDDLE = '/resources/:id/sub-resources'
const URL_WITH_MULTIPLE_PARAMETERS =
  '/resources/:resourceId/sub-resources/:subResourceId'

const QUERY_PARAMETERS_WITH_SINGLE_VALUE = {
  query1: 'value1',
  query2: 'value2'
}

const QUERY_PARAMETERS_WITH_MULTIPLE_VALUES = {
  query1: ['value1', 'value2'],
  query2: ['value3', 'value4']
}

const QUERY_PARAMETERS_WITH_NESTED_OBJECT = {
  query: {
    query1: 'value1',
    query2: 'value2',
    query3: null,
    query4: undefined
  }
}

const QUERY_PARAMETERS_WITH_UNDEFINED_OR_NULL_VALUE = {
  query1: 'value1',
  query2: undefined,
  query3: null
}

describe('getFullUrl helper function', () => {
  it('should return valid url with single dynamic parameter in the end', () => {
    const resultUrl = getFullUrl({
      pathname: URL_WITH_SINGLE_PARAMETER_IN_THE_END,
      parameters: {
        id: 'someId'
      }
    })

    expect(resultUrl).toBe('/resources/someId')
  })

  it('should return valid url with single dynamic parameter in the middle', () => {
    const resultUrl = getFullUrl({
      pathname: URL_WITH_SINGLE_PARAMETER_IN_THE_MIDDLE,
      parameters: {
        id: 'someId'
      }
    })

    expect(resultUrl).toBe('/resources/someId/sub-resources')
  })

  it('should return valid url with multiple dynamic parameters', () => {
    const resultUrl = getFullUrl({
      pathname: URL_WITH_MULTIPLE_PARAMETERS,
      parameters: {
        resourceId: 'firstId',
        subResourceId: 'secondId'
      }
    })

    expect(resultUrl).toBe('/resources/firstId/sub-resources/secondId')
  })

  it('should return valid url with query parameters with single value', () => {
    const resultUrl = getFullUrl({
      pathname: '',
      searchParameters: QUERY_PARAMETERS_WITH_SINGLE_VALUE
    })

    expect(resultUrl).toBe('?query1=value1&query2=value2')
  })

  it('should return valid url with query parameters with multiple values', () => {
    const resultUrl = getFullUrl({
      pathname: '',
      searchParameters: QUERY_PARAMETERS_WITH_MULTIPLE_VALUES
    })

    expect(resultUrl).toBe(
      '?query1=value1&query1=value2&query2=value3&query2=value4'
    )
  })

  it('should return valid url with query parameters with nested object values', () => {
    const resultUrl = getFullUrl({
      pathname: '',
      searchParameters: QUERY_PARAMETERS_WITH_NESTED_OBJECT
    })

    expect(resultUrl).toBe('?query%5Bquery1%5D=value1&query%5Bquery2%5D=value2')
  })

  it('should return valid url with query parameters with undefined or null value', () => {
    const resultUrl = getFullUrl({
      pathname: '',
      searchParameters: QUERY_PARAMETERS_WITH_UNDEFINED_OR_NULL_VALUE
    })

    expect(resultUrl).toBe('?query1=value1')
  })
})
