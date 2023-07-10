import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import MyLessons from '~/pages/my-lessons/MyLessons'

describe('MyLessons', () => {
  beforeEach(() => {
    renderWithProviders(<MyLessons />)
  })

  it('renders the component with tabs', () => {
    const tab1 = screen.getByText('All lessons')
    const tab2 = screen.getByText('Grouped lessons')

    expect(tab1).toBeInTheDocument()
    expect(tab2).toBeInTheDocument()
  })
})
