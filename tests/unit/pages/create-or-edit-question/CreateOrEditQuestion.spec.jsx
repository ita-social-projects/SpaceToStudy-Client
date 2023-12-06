import { screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import CreateOrEditQuestion from '~/pages/create-or-edit-question/CreateOrEditQuestion'

describe('CreateOrEditQuestion component test', () => {
  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CreateOrEditQuestion />))
  })

  it('should display CreateQuestion form', () => {
    const title = screen.getByLabelText('questionPage.untitled')

    expect(title).toBeInTheDocument()
  })
})
