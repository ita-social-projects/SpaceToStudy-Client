import { screen, render } from '@testing-library/react'
import VideoBox from '~/components/video-box/VideoBox'

describe('VideoBox component', () => {
  it('should render video preview when videoPreview is true', () => {
    render(<VideoBox video='video.mp4' videoPreview={false} />)

    const videoPreview = screen.getByAltText('Video')
    const videoPlayer = screen.queryByTestId('video-player')

    expect(videoPreview).toBeInTheDocument()
    expect(videoPlayer).not.toBeInTheDocument()
  })

  it('should render VideoPlayer when videoPreview is false', () => {
    render(<VideoBox video='video.mp4' videoPreview={false} />)

    const videoPlayer = screen.getByTestId('video-player')

    expect(videoPlayer).toBeInTheDocument()
  })
})
