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
    const text = screen.getByText('guestHomePage.whatCanYouDo.title')

    expect(text).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const text = screen.getByText('guestHomePage.whatCanYouDo.description')

    expect(text).toBeInTheDocument()
  })
})
