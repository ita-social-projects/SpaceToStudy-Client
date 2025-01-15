import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { ResourceService } from '~/services/resource-service'

describe('resourseService tests', () => {
  it('should edit a lesson', async () => {
    const lessonId = '6255bc080a75adf9223df444'
    const lessonData = {
      title: 'Lesson 1',
      description: 'Lesson description',
      content: 'Lesson content',
      attachments: [],
      category: null
    }
    mockAxiosClient
      .onPatch(
        new RegExp(URLs.resources.lessons.patch.replace(':id', lessonId))
      )
      .reply(200)

    await ResourceService.editLesson(lessonData, lessonId)

    expect(mockAxiosClient.history.patch[0].url).toBe(
      URLs.resources.lessons.patch.replace(':id', lessonId)
    )
  })
  it('should get resource categories names', async () => {
    const mockResponse = [
      { _id: '1', name: 'Category 1' },
      { _id: '2', name: 'Category 2' }
    ]

    mockAxiosClient
      .onGet(URLs.resources.resourcesCategories.getNames)
      .reply(200, mockResponse)

    const response = await ResourceService.getResourcesCategoriesName()

    expect(mockAxiosClient.history.get[0].url).toBe(URLs.resources.resourcesCategories.getNames)
    expect(response).toEqual(mockResponse)
  })
  it('should create a resource category', async () => {
    const mockResponse = { _id: '3', name: 'New Category' }
    const params = { name: 'New Category' }

    mockAxiosClient
      .onPost(URLs.resources.resourcesCategories.post)
      .reply(200, mockResponse)

    const response = await ResourceService.createResourceCategory(params)

    expect(mockAxiosClient.history.post[0].url).toBe(URLs.resources.resourcesCategories.post)
    expect(mockAxiosClient.history.post[0].data).toBe(JSON.stringify(params))
    expect(response).toEqual(mockResponse)
  })
})
