import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { routes } from '~/constants/routes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import VideoBox from '~/components/video-box/VideoBox'
import videoImg from '~/assets/img/guest-home-page/videoImg.png'

const sectionId = routes.guestNavBar.whoWeAre.label

const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box className='section' id={ sectionId } sx={ { flexDirection: 'column', px: '16px' } }>
      <TitleWithDescription
        description={ t('guestHomePage.whoWeAre.description') }
        descriptionStyles={ { typography: { xs: 'subtitle1' } } }
        title={ t('guestHomePage.whoWeAre.title') }
        titleStyles={ { typography: { md: 'h3', xs: 'h4' } } }
      />
      <VideoBox video={ videoImg } />
    </Box>
  )
}

export default WhoWeAre
