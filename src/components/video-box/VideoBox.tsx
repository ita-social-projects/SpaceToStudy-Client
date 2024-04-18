import { FC } from 'react'
import Box from '@mui/material/Box'
import titleBar from '~/assets/img/guest-home-page/title-bar.png'
import VideoPlayer from '~/components/video-player/VideoPlayer'
import { styles } from '~/components/video-box/VideoBox.styles'
import { VideoBoxType } from '~/types/video-box/videoBox.index'
import { ComponentEnum } from '~/types'

const VideoBox: FC<VideoBoxType> = ({ video, videoPreview, videoMock }) => {
  const videoBlockContent = videoPreview ? (
    <Box
      alt='Video'
      component={ComponentEnum.Img}
      src={videoMock}
      sx={styles.video}
    />
  ) : (
    <VideoPlayer video={video} />
  )

  return (
    <Box data-testid='videoBox' sx={styles.videoBox}>
      <Box alt='Title bar' component={ComponentEnum.Img} src={titleBar} />
      <Box sx={styles.videoBg}>{videoBlockContent}</Box>
    </Box>
  )
}

export default VideoBox
