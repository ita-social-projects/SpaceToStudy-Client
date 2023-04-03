import { vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import useSubjects from '~/hooks/use-subjects'
import { subjectService } from '~/services/subject-service'

vi.mock('axios')
vi.mock('~/services/subject-service')

const mockSubjects = [
  { _id: '1', name: 'Subject 1', icon: 'icon' },
  { _id: '2', name: 'Subject 2', icon: 'icon' }
]

const mockError = { status: 404, code: 'NOT_FOUND', message: 'The requested URL was not found.' }

describe('useSubjects', () => {
  it('fetches subjects successfully', async () => {
    subjectService.getSubjects.mockResolvedValueOnce({ data: mockSubjects })

    const { result, waitForNextUpdate } = renderHook(() => useSubjects(null))

    expect(result.current.loading).toBe(true)
    expect(result.current.responseItems).toEqual([])

    await waitForNextUpdate()

    expect(subjectService.getSubjects).toHaveBeenCalled()

    expect(result.current.loading).toBe(false)
    expect(result.current.responseItems).toEqual(mockSubjects)
  })

  it('handles API errors', async () => {
    subjectService.getSubjects.mockRejectedValueOnce(mockError)

    const { result, waitForNextUpdate } = renderHook(() => useSubjects(null))

    expect(result.current.loading).toBe(true)
    expect(result.current.responseItems).toEqual([])

    await waitForNextUpdate()

    expect(subjectService.getSubjects).toHaveBeenCalled()

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toEqual(mockError)
  })
})
