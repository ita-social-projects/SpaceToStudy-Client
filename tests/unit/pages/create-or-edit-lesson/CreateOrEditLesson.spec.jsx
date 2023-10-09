import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'

const mockFetchData = vi.fn()

describe('CreateOrEditLesson', () => {
  beforeEach(() => {
    vi.mock('~/services/resource-service', () => ({
      ResourceService: {
        addLesson: () => mockFetchData()
      }
    }))
    renderWithProviders(<CreateOrEditLesson />)
  })

  it('should render page with title and description fields', () => {
    const titleInput = screen.getByLabelText('lesson.labels.title')
    const descriptionInput = screen.getByLabelText('lesson.labels.description')

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
  })

  it('should add attachments', () => {
    const addedAttachment = screen.getByText('lesson.labels.attachments')
    expect(addedAttachment).toBeInTheDocument()

    fireEvent.click(screen.getByText('lesson.labels.attachments'))
  })

  it('display validation error if title or description is empty', () => {
    const titleInput = screen.getByLabelText('lesson.labels.title')
    fireEvent.change(titleInput, { target: { value: '' } })

    const descriptionInput = screen.getByLabelText('lesson.labels.description')
    fireEvent.change(descriptionInput, { target: { value: '' } })
  })
})
