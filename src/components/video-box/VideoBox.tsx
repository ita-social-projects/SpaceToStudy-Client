import { FC } from 'react'
import Box from '@mui/material/Box'
import titleBar from '~/assets/img/guest-home-page/title-bar.png'
import { styles } from '~/components/video-box/VideoBox.styles'
import VideoPlayer from '../video-player/VideoPlayer'

interface VideoBoxProps {
  video: string
  videoPreview: boolean
  videoMock: string
}

const VideoBox: FC<VideoBoxProps> = ({ video, videoPreview, videoMock }) => {
  const videoBlockContent = videoPreview ? (
    <Box alt='Video' component='img' src={videoMock} sx={styles.video} />
  ) : (
    <VideoPlayer video={video} />
  )

  return (
    <Box data-testid='videoBox' sx={styles.videoBox}>
      <Box alt='Title bar' component='img' src={titleBar} />
      <Box sx={styles.videoBg}>{videoBlockContent}</Box>
    </Box>
  )
}

export default VideoBox
