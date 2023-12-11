import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import MyResources from '~/pages/my-resources/MyResources'

describe('MyResources', () => {
  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<MyResources />))
  })

  it('renders the component with tabs', () => {
    const tab1 = screen.getByText('myResourcesPage.tabs.quizzes')
    const tab2 = screen.getByText('myResourcesPage.tabs.attachments')

    expect(tab1).toBeInTheDocument()
    expect(tab2).toBeInTheDocument()
  })
})
