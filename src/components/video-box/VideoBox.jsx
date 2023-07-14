import Box from '@mui/material/Box'

import titleBar from '~/assets/img/guest-home-page/title-bar.png'
import { styles } from '~/components/video-box/VideoBox.styles'

const VideoBox = ({ video }) => {
  return (
    <Box data-testid='videoBox' sx={styles.videoBox}>
      <Box alt='Title bar' component='img' src={titleBar} />
      <Box sx={styles.videoBg}>
        <Box alt='Video' component='img' src={video} sx={styles.video} />
      </Box>
    </Box>
  )
}

export default VideoBox
