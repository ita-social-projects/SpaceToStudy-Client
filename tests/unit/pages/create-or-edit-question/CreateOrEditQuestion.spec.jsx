import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { describe } from 'vitest'
import CreateOrEditQuestion from '~/pages/create-or-edit-question/CreateOrEditQuestion'

const mockFetchData = vi.fn()

vi.mock('~/services/resource-service', () => ({
  ResourseService: {
    createQuestion: () => mockFetchData()
  }
}))

describe('CreateOrEditQuestion component test', () => {
  it('should display CreateQuestion form', () => {
    renderWithProviders(<CreateOrEditQuestion />)

    const title = screen.getByLabelText('questionPage.untitled')
    expect(title).toBeInTheDocument()
  })
})
