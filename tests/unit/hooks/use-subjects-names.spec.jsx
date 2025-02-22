import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useSubjects from '~/hooks/use-subjects-names'
import { subjectService } from '~/services/subject-service'
import { baseService } from '~/services/base-service'
import QueryProvider from '~/QueryProvider'
import { queryClient } from '~/plugins/queryClient'

vi.mock('~/services/subject-service')
vi.mock('~/services/base-service')

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
    subjectService.getSubjectsNames.mockResolvedValueOnce(mockSubjectsNames)

    const { result } = renderHook(() => useSubjects({ category: 'category' }), {
      wrapper: QueryProvider
    })

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith('category')

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.response).toEqual(mockSubjectsNames)
    })
  })

  it('handles API errors', async () => {
    baseService.request.mockRejectedValueOnce({
      response: {
        data: mockError
      }
    })

    const { result } = renderHook(() => useSubjects({ category: 'category' }), {
      wrapper: QueryProvider
    })

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith('category')

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).not.toEqual([])
    })
  })
})
