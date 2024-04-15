import { FC } from 'react'
import Box from '@mui/material/Box'
import titleBar from '~/assets/img/guest-home-page/title-bar.png'
import { styles } from '~/components/video-box/VideoBox.styles'
import VideoPlayer from '../video-player/VideoPlayer'

interface VideoBoxProps {
  video: string,
  haveVideo : boolean
}

const VideoBox: FC<VideoBoxProps> = ({ video, haveVideo }) => {
  const videoBloc = haveVideo ? 
  <VideoPlayer video='www.youtube.com/watch?v=LXb3EKWsInQ&t=101s&ab_channel=Jacob%2BKatieSchwarz'/> 
  :  
  <Box alt='Video' component='img' src={video} sx={styles.video} /> 

  return (
    <Box data-testid='videoBox' sx={styles.videoBox}>
      <Box alt='Title bar' component='img' src={titleBar} />
      <Box sx={styles.videoBg}>
        {videoBloc}
      </Box>
    </Box>
  )
}

export default VideoBox
