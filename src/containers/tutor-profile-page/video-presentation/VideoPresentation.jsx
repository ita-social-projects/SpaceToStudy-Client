import { useTranslation } from 'react-i18next'

import { Box, Typography } from '@mui/material'

import VideoBox from '~/components/video-box/VideoBox'
import videoImg from '~/assets/img/tutor-profile-page/presentationVideoImg.png'

const VideoPresentation = () => {
  const { t } = useTranslation()

  return (
    <Box className='section' data-testid='video-presentation' sx={ { flexDirection: 'column', px: '16px' } }>
      <Typography sx={ { mb: '32px' } } variant={ 'h4' }>
        { t('tutorProfilePage.videoPresentation.title') } 
       
        { t('guestHomePage.whoWeAre.title') }
      </Typography>
      <VideoBox video={ videoImg } />
    </Box>
  )
}

export default VideoPresentation
