import { fireEvent, screen, waitFor } from '@testing-library/react'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'

import { createUrlPath } from '~/utils/helper-functions'
import { ResourceService } from '~/services/resource-service'
import { URLs } from '~/constants/request'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'

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
    mockAxiosClient
      .onGet(createUrlPath(URLs.resources.lessons.get, mockParams.id))
      .reply(200, mockLesson)
  })

  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CreateOrEditLesson />))
  })

  it('should load a lesson info', () => {
    const titleInput = screen.getByDisplayValue(mockLesson.title)

    expect(titleInput).toBeInTheDocument()
  })

  it('should edit a lesson', async () => {
    mockAxiosClient.onPatch(URLs.resources.lessons.patch).reply(200)
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
