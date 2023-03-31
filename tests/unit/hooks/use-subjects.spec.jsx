import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import useSubjects from '~/hooks/use-subjects'
import { subjectService } from '~/services/subject-service'
import { vi } from 'vitest'

vi.mock('axios')
vi.mock('~/services/subject-service')

const mockSubjects = [
  { _id: '1', name: 'Subject 1', icon: 'icon' },
  { _id: '2', name: 'Subject 2', icon: 'icon' }
]
const mockSubjectsNames = [
  { _id: '1', name: 'Subject 1' },
  { _id: '2', name: 'Subject 2' }
]

describe('useSubjects', () => {
  beforeEach(() => {
    axios.mockClear()
    subjectService.getSubjects.mockClear()
    subjectService.getSubjectsNames.mockClear()
  })

  it('fetches subjects and subject names', async () => {
    subjectService.getSubjects.mockResolvedValueOnce({ data: mockSubjects })
    subjectService.getSubjectsNames.mockResolvedValueOnce({ data: mockSubjectsNames })

    const { result, waitForNextUpdate } = renderHook(() => useSubjects(null))

    expect(result.current.subjectsLoading).toBe(true)
    expect(result.current.subjectsItems).toEqual([])
    expect(result.current.subjectsNamesLoading).toBe(true)
    expect(result.current.subjectsNamesItems).toEqual([])

    await waitForNextUpdate()

    expect(subjectService.getSubjects).toHaveBeenCalled()
    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith(null)

    expect(result.current.subjectsLoading).toBe(false)
    expect(result.current.subjectsItems).toEqual(mockSubjects)
    expect(result.current.subjectsNamesLoading).toBe(false)
    expect(result.current.subjectsNamesItems).toEqual(mockSubjects.map(({ _id, name }) => ({ _id, name })))
  })

  it('fetches subjects with a category', async () => {
    subjectService.getSubjects.mockResolvedValueOnce({ data: mockSubjects })
    subjectService.getSubjectsNames.mockResolvedValueOnce({ data: mockSubjectsNames })

    const { waitForNextUpdate } = renderHook(() => useSubjects('category'))

    await waitForNextUpdate()

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith('category')
  })
})
