import { render, screen } from '@testing-library/react'
import VideoPresentation from '~/containers/user-profile/video-presentation/VideoPresentation'

describe('VideoPresentation component', () => {
  beforeEach(() => {
    render(<VideoPresentation />)
  })

  it('should render title text', () => {
    const title = screen.getByText('userProfilePage.videoPresentation.title')

    expect(title).toBeInTheDocument()
  })

  it('should render VideoBox component', () => {
    const videoBox = screen.getByTestId('videoBox')

    expect(videoBox).toBeInTheDocument()
  })
})
