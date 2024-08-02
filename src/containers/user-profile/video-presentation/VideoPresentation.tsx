import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VideoBox from '~/components/video-box/VideoBox'
import { ComponentEnum } from '~/types'

interface VideoPresentationProps {
  video: string
  videoPreview: boolean
  videoMock: string
}

const VideoPresentation = ({
  video,
  videoPreview,
  videoMock
}: VideoPresentationProps) => {
  const { t } = useTranslation()

  return (
    <Box className={ComponentEnum.Section} sx={{ flexDirection: 'column' }}>
      <Typography sx={{ my: '32px', typography: { md: 'h4', xs: 'h5' } }}>
        {t('userProfilePage.videoPresentation.title')}
      </Typography>
      <VideoBox
        video={video}
        videoMock={videoMock}
        videoPreview={videoPreview}
      />
    </Box>
  )
}

export default VideoPresentation
