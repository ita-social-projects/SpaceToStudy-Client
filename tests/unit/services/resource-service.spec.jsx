import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { ResourceService } from '~/services/resource-service'

describe('resourseService tests', () => {
  afterEach(() => {
    mockAxiosClient.resetHistory() 
    mockAxiosClient.reset() 
  })

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

  it('should fetch a quiz by ID', async () => {
    const quizId = '6641388f36ebdb0432a3a2e5'
    const mockQuizData = {
      _id: quizId,
      title: 'Sample Quiz',
      items: [],
      author: '12345',
      category: null,
      resourceType: 'Quiz',
      settings: {
        view: 'Stepper',
        shuffle: false,
        pointValues: true,
        scoredResponses: true,
        correctAnswers: true
      },
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }

    mockAxiosClient
      .onGet(URLs.quizzes.getById.replace(':id', quizId))
      .reply(200, mockQuizData)

    const result = await ResourceService.getQuizQuery(quizId)

    expect(mockAxiosClient.history.get[0].url).toBe(
      URLs.quizzes.getById.replace(':id', quizId)
    )
    expect(result).toEqual(mockQuizData)
  })
})
