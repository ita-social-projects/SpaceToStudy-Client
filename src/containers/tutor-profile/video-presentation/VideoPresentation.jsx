import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VideoBox from '~/components/video-box/VideoBox'

const VideoPresentation = (video, haveVideo) => {
  const { t } = useTranslation()

  return (
    <Box className='section' sx={{ flexDirection: 'column' }}>
      <Typography sx={{ my: '32px', typography: { md: 'h4', xs: 'h5' } }}>
        {t('tutorProfilePage.videoPresentation.title')}
      </Typography>
      <VideoBox video={video} haveVideo = {haveVideo}/>
    </Box>
  )
}

export default VideoPresentation