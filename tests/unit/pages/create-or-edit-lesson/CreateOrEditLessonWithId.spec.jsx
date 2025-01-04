import { fireEvent, screen, waitFor } from '@testing-library/react'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'

import { ResourceService } from '~/services/resource-service'
import { baseService } from '~/services/base-service'
import { renderWithProviders } from '~tests/test-utils'

const mockParams = {
  id: 'id'
}

const mockLesson = {
  title: 'Lesson 1',
  author: 'authorId',
  content: 'Lesson content',
  attachments: [],
  category: null
}

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => mockParams
}))

describe('CreateOrEditLesson component with id', () => {
  beforeAll(() => {
    vi.spyOn(ResourceService, 'editLesson')

    vi.spyOn(baseService, 'request').mockImplementation((config) => {
      if (config.method === 'PATCH') {
        return Promise.resolve({ data: {} })
      }

      if (config.method === 'GET') {
        return Promise.resolve({ data: mockLesson })
      }

      return Promise.reject(new Error('Unexpected request'))
    })
  })

  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CreateOrEditLesson />))
    await screen.findByDisplayValue(mockLesson.title)
  })

  it('should load a lesson info', () => {
    const titleInput = screen.getByDisplayValue(mockLesson.title)
    expect(titleInput).toBeInTheDocument()
  })

  it('should edit a lesson', async () => {
    const editLessonSpy = vi.spyOn(ResourceService, 'editLesson')
    const titleInput = await screen.findByDisplayValue(mockLesson.title)
    const descriptionInput = screen.getByLabelText('lesson.labels.description')
    const submitBtn = screen.getByText('common.save')

    fireEvent.change(titleInput, { target: { value: 'title' } })
    fireEvent.change(descriptionInput, { target: { value: 'description' } })
    fireEvent.click(submitBtn)

    expect(editLessonSpy).toHaveBeenCalled()
  })
})
