import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import { guestRoutes } from '~/router/constants/guestRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import VideoBox from '~/components/video-box/VideoBox'
import videoImgLandingPage from '~/assets/img/guest-home-page/videoImg.png'

import { styles } from '~/containers/guest-home-page/who-we-are/WhoWeAre.styles.js'

const WhoWeAre = () => {
  const { t } = useTranslation()
  const landingPageVideo = true

  return (
    <Box
      className='section'
      id={guestRoutes.navBar.whoWeAre.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('guestHomePage.whoWeAre.description')}
        style={styles.titleWithDescription}
        title={t('guestHomePage.whoWeAre.title')}
      />
      <VideoBox
        videoMock={videoImgLandingPage}
        videoPreview={landingPageVideo}
      />
    </Box>
  )
}

export default WhoWeAre
