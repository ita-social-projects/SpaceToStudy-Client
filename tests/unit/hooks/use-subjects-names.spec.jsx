import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useSubjects from '~/hooks/use-subjects-names'
import { subjectService } from '~/services/subject-service'

vi.mock('~/services/subject-service')

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
    subjectService.getSubjectsNames.mockResolvedValueOnce({
      data: mockSubjectsNames
    })

    const { result } = renderHook(() => useSubjects({ category: 'category' }))

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith('category')

    waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.response).toEqual(mockSubjectsNames)
    })
  })

  it('handles API errors', async () => {
    subjectService.getSubjectsNames.mockRejectedValueOnce({
      response: {
        data: mockError
      }
    })

    const { result } = renderHook(() => useSubjects({ category: 'category' }))

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith('category')

    waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual(mockError)
    })
  })
})
