import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import { guestRoutes } from '~/router/constants/guestRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import VideoBox from '~/components/video-box/VideoBox'
import videoImgLandingPage from '~/assets/img/guest-home-page/videoImg.png'

import { styles } from '~/containers/guest-home-page/who-we-are/WhoWeAre.styles.js'

// remove later

import DividerComponent from '~/design-system/components/divider/Divider'

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
      <DividerComponent
        caption={'test'}
        orientation={'horizontal'}
        textAlign='center'
        thickness='sm'
        type='linear'
        variant={'fullWidth'}
      />

      <Divider
        style={{
          color: 'black'
        }}
        sx={{
          width: '100%',
          '&.MuiDivider-root': {
            '&::before': {
              border: `3px solid red`
            }
          }
        }}
        variant='middle'
      >
        {' '}
        Editing as - xwqo{' '}
      </Divider>

      {/* the gold mine? */}

      {/* <DividerComponent
        caption={'test'}
        orientation={'horizontal'}
        size='small'
        textAlign='center'
        thickness='sm'
        type='ellipse'
        variant={'fullWidth'}
      />

      <DividerComponent
        caption={'test'}
        orientation={'horizontal'}
        textAlign='center'
        thickness='sm'
        type='linear'
        variant={'fullWidth'}
      />

      <DividerComponent
        caption={'test'}
        orientation={'horizontal'}
        size='big'
        textAlign='center'
        thickness='md'
        type='ellipse'
        variant={'fullWidth'}
      />

      <DividerComponent
        caption={'test'}
        orientation={'vertical'}
        size='big'
        textAlign='center'
        thickness='md'
        type='linear'
        variant={'fullWidth'}
      /> */}
    </Box>
  )
}

export default WhoWeAre
