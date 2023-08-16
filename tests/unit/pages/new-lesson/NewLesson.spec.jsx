import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import NewLesson from '~/pages/new-lesson/NewLesson'

describe('NewLesson', () => {
  beforeEach(() => {
    renderWithProviders(<NewLesson />)
  })

  it('should render page with title and description fields', () => {
    const titleInput = screen.getByLabelText('newLesson.labels.title')
    const descriptionInput = screen.getByLabelText(
      'newLesson.labels.description'
    )

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
  })
})
