import { vi } from 'vitest'
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
    }
  ],
  count: 1
}

const mockSubjectsByCategoryId = {
  items: mockSubjects.items.filter(
    (item) => item.category._id === mockCategoryId
  ),
  count: 1
}

const mockSubjectData = {
  name: 'New Networking',
  category: mockCategoryId
}

const mockCreatedSubject = {
  _id: '10',
  name: 'New Networking',
  category: {
    _id: mockCategoryId
  }
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

  it('should fetch subject names by categoryId', async () => {
    const getFullUrlSpy = vi.spyOn(getFullUrl, 'getFullUrl')

    mockAxiosClient
      .onGet(URLs.subjects.getNamesByCategoryId.replace(':id', mockCategoryId))
      .reply(200, mockSubjects)

    const result = await subjectService.getSubjectsNames(mockCategoryId)

    expect(result).toEqual(mockSubjects)
    expect(getFullUrlSpy).toHaveBeenCalledWith({
      pathname: URLs.subjects.getNamesByCategoryId,
      parameters: { id: mockCategoryId }
    })
  })

  it('should create a new subject successfully', async () => {
    mockAxiosClient.onPost(URLs.subjects.create).reply(201, mockCreatedSubject)

    const result = await subjectService.createSubject(mockSubjectData)

    expect(result).toEqual(mockCreatedSubject)
    expect(JSON.parse(mockAxiosClient.history.post[0].data)).toEqual(
      mockSubjectData
    )
  })
})
