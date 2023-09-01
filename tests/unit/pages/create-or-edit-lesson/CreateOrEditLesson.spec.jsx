import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'

describe('CreateOrEditLesson', () => {
  beforeEach(() => {
    renderWithProviders(<CreateOrEditLesson />)
  })

  it('should render page with title and description fields', () => {
    const titleInput = screen.getByLabelText('lesson.labels.title')
    const descriptionInput = screen.getByLabelText('lesson.labels.description')

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
  })
})
