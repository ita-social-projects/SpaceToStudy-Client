import { expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useSubjects from '~/hooks/use-subjects-names'
import { subjectService } from '~/services/subject-service'
import QueryProvider from '~/QueryProvider'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockSubjectsNames = [
  { _id: '1', name: 'Subject 1' },
  { _id: '2', name: 'Subject 2' }
]

const mockError = {
  status: 404,
  code: 'NOT_FOUND',
  message: 'The requested URL was not found.'
}

describe('useSubjectsNames', () => {
  it('fetches subjects with a category successfully', async () => {
    mockAxiosClient
      .onGet(URLs.subjects.getNamesByCategoryId.replace(':id', 'category'))
      .reply(200, mockSubjectsNames)

    const getSubjectsNamesSpy = vi.spyOn(subjectService, 'getSubjectsNames')

    const { result } = renderHook(() => useSubjects({ category: 'category' }), {
      wrapper: QueryProvider
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual([])

    expect(getSubjectsNamesSpy).toHaveBeenCalledWith('category')

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.response).toEqual(mockSubjectsNames)
    })
  })

  it('handles API errors', async () => {
    mockAxiosClient
      .onGet(URLs.subjects.getNamesByCategoryId.replace(':id', 'mock'))
      .reply(400, mockError)

    const getSubjectsNamesSpy = vi.spyOn(subjectService, 'getSubjectsNames')

    const { result } = renderHook(() => useSubjects({ category: 'mock' }), {
      wrapper: QueryProvider
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual([])

    expect(getSubjectsNamesSpy).toHaveBeenCalledWith('mock')

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false)
        expect(result.current.error.message).toEqual(mockError.message)
      },
      { timeout: 8000 }
    )
  }, 8000)
})
