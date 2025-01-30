import { afterEach, vi } from 'vitest'
import { mockAxiosClient } from '~tests/test-utils'
import { subjectService } from '~/services/subject-service'
import { URLs } from '~/constants/request'
import * as getFullUrl from '~/utils/get-full-url'

const mockCategoryId = '64884fedfdc2d1a130c24ade'
const mockParams = { limit: 8 }

const mockSubjects = {
  items: [
    {
      _id: '1',
      name: 'Networking',
      category: {
        _id: mockCategoryId
      }
    },
    {
      _id: '2',
      name: 'Software Design',
      category: {
        _id: '64884fedfdc2d1a130c24adb'
      }
    }
  ],
  count: 2
}

const mockSubjectsByCategoryId = {
  items: mockSubjects.items.filter(
    (item) => item.category._id === mockCategoryId
  ),
  count: 1
}

describe('subjectService getSubjects function tests', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should find subjects by categoryId', async () => {
    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')

    mockAxiosClient
      .onGet(
        new RegExp(URLs.subjects.getByCategoryId.replace(':id', mockCategoryId))
      )
      .reply(200, mockSubjectsByCategoryId)

    const result = await subjectService.getSubjects({
      ...mockParams,
      categoryId: mockCategoryId
    })

    expect(result).toEqual(mockSubjectsByCategoryId)
    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.subjects.getByCategoryId,
      parameters: { id: mockCategoryId },
      searchParameters: mockParams
    })
  })

  it('should find all subjects', async () => {
    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')

    mockAxiosClient
      .onGet(new RegExp(URLs.subjects.get))
      .reply(200, mockSubjects)

    const result = await subjectService.getSubjects(mockParams)

    expect(result).toEqual(mockSubjects)
    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.subjects.get,
      searchParameters: mockParams
    })
  })
})
