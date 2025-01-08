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
})
