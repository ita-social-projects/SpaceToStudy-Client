import { screen, render } from '@testing-library/react'

import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'

describe('WhoWeAre component', () => {
  beforeEach(() => {
    render(<WhoWeAre />)
  })

  it('should contain img', () => {
    const videoBox = screen.getByTestId('video section')

    expect(videoBox).toBeInTheDocument()
  })
})
