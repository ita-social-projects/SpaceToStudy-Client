import { FC } from 'react'
import { Box } from '@mui/material'
import ReactPlayer from 'react-player/youtube'
import { styles } from '~/components/video-player/VideoPlayer.styles'

interface VideoPlayerProps {
  video:string 
}

const VideoPlayer: FC<VideoPlayerProps> = ({ video }) =>  {
  return (
    <Box sx={styles.playerWrapper}>
    <ReactPlayer
    style={styles.player}
    url= {video}
    width= '100%'
    height= '100%'
    controls
      />
    </Box>
  )
}

export default VideoPlayer

