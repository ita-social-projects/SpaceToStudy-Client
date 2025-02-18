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

    const result = await ResourceService.getQuiz(quizId)

    expect(mockAxiosClient.history.get[0].url).toBe(
      URLs.quizzes.getById.replace(':id', quizId)
    )
    expect(result).toEqual(mockQuizData)
  })

  it('should edit a quiz', async () => {
    const quizId = '6255bc080a75adf9223df444'
    const quizData = {
      title: 'Updated Quiz Title',
      description: 'Updated description',
      items: [],
      category: '12345',
      settings: {
        view: 'Stepper',
        shuffle: false,
        pointValues: true,
        scoredResponses: true,
        correctAnswers: true
      }
    }
  
    mockAxiosClient
      .onPatch(new RegExp(URLs.quizzes.patch.replace(':id', quizId)))
      .reply(200)
  
    await ResourceService.editQuiz({ id: quizId, ...quizData })
  
    expect(mockAxiosClient.history.patch[0].url).toBe(
      URLs.quizzes.patch.replace(':id', quizId)
    )
  
    expect(mockAxiosClient.history.patch[0].data).toEqual(JSON.stringify(quizData))
  })

  it('should create a new quiz', async () => {
    const newQuizData = {
      title: 'New Quiz',
      description: 'Description for new quiz',
      items: [],
      category: '12345',
      resourceType: 'Quiz',
      settings: {
        view: 'Linear',
        shuffle: true,
        pointValues: false,
        scoredResponses: false,
        correctAnswers: false
      }
    }
  
    const mockResponse = {
      ...newQuizData,
      _id: 'new-quiz-id',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z'
    }
  
    mockAxiosClient.onPost(URLs.quizzes.add).reply(200, mockResponse)
  
    const createdQuiz = await ResourceService.addQuiz(newQuizData)
  
    expect(mockAxiosClient.history.post[0].url).toBe(URLs.quizzes.add)
  
    expect(mockAxiosClient.history.post[0].data).toEqual(JSON.stringify(newQuizData))
  
    expect(createdQuiz).toEqual(mockResponse)
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

   it('should edit an attachment', async () => {
     const attachmentId = '6255bc080a75adf9223df444'
     const attachment = {
       description: 'Modified description',
       category: '8655bc080a75adf9223df444'
     }
     const mockAttachmentResponse = {
       ...attachment,
       _id: attachmentId,
       link: '1722535882408-test.pdf',
       size: 15069,
       resourceType: 'Attachment'
     }

     mockAxiosClient.onPatch().reply((config) => {
       expect(config.url).toBe(`/attachments/${attachmentId}`)

       return [200, mockAttachmentResponse]
     })

     const updatedAttachmentResponse =
       await ResourceService.updateAttachmentQuery({
         ...attachment,
         id: attachmentId
       })

     expect(updatedAttachmentResponse).toEqual(mockAttachmentResponse)
   })
})
