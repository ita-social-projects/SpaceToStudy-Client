import Box from '@mui/material/Box'

import { styles } from '~/components/video-box/VideoBox.styles'
import titleBar from '~/assets/img/guest-home-page/title-bar.png'

const VideoBox = ({ video }) => {
  return (
    <Box data-testid='videoBox'>
      <Box
        alt='Title bar' component='img' src={ titleBar }
        sx={ styles.titleBar }
      />
      <Box sx={ styles.videoBg }>
        <Box
          alt='Video' component='img' src={ video }
          sx={ styles.video }
        />
      </Box>
    </Box>
  )
}

export default VideoBox
