import { screen, render } from '@testing-library/react'

import VideoBox from '~/components/video-box/VideoBox'

const props = {
  video: 'video.mp4'
}

describe('VideoBox component', () => {
  beforeEach(() => {
    render(<VideoBox { ...props } />)
  })

  it('should contain video', () => {
    const video = screen.getByAltText('Video')

    expect(video).toBeInTheDocument()
  })
})
