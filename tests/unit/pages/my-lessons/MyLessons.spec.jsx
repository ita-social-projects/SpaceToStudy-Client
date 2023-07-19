import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import MyResources from '~/pages/my-resources/MyResources'

describe('MyLessons', () => {
  beforeEach(() => {
    renderWithProviders(<MyResources />)
  })

  it('renders the component with tabs', () => {
    const tab1 = screen.getByText('All lessons')
    const tab2 = screen.getByText('Grouped lessons')

    expect(tab1).toBeInTheDocument()
    expect(tab2).toBeInTheDocument()
  })
})
