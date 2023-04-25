import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import { guestRoutes } from '~/router/constants/guestRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import VideoBox from '~/components/video-box/VideoBox'
import videoImg from '~/assets/img/guest-home-page/videoImg.png'

import { styles } from '~/containers/guest-home-page/who-we-are/WhoWeAre.styles.js'

const sectionId = guestRoutes.navBar.whoWeAre.route

const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box className='section' id={sectionId} sx={styles.container}>
      <TitleWithDescription
        description={t('guestHomePage.whoWeAre.description')}
        style={styles.titleComp}
        title={t('guestHomePage.whoWeAre.title')}
      />
      <VideoBox video={videoImg} />
    </Box>
  )
}

export default WhoWeAre
