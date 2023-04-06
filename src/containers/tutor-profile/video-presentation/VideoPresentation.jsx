import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VideoBox from '~/components/video-box/VideoBox'
import videoImg from '~/assets/img/tutor-profile-page/presentationVideoImg.png'

const VideoPresentation = () => {
  const { t } = useTranslation()

  return (
    <Box className='section' sx={{ flexDirection: 'column' }}>
      <Typography sx={{ my: '32px', typography: { md: 'h4', xs: 'h5' } }}>
        {t('tutorProfilePage.videoPresentation.title')}
      </Typography>
      <VideoBox video={videoImg} />
    </Box>
  )
}

export default VideoPresentation
