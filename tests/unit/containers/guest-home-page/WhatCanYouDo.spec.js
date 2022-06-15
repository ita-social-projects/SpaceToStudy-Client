import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'

describe('WhatCanYouDo component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <WhatCanYouDo />
      </MemoryRouter>
    )
  })

  it('should have correct title', () => {
    const title = screen.getByTestId('title')

    expect(title).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const description = screen.getByTestId('description')

    expect(description).toBeInTheDocument()
  })
})
