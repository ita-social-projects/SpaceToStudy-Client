import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import videoImg from '~/assets/img/guest-home-page/videoImg.png'
import videoBg from '~/assets/img/guest-home-page/videoBg.png'

const titleVariant = {
  md: 'h3',
  xs: 'h4'
}

const descriptionVariant = {
  xs: 'subtitle1'
}

const styles = {
  videoWrapper: {
    padding: {
      md: '77px 96px 32px',
      sm: '50px 60px 20px',
      xs: '28px 12px',
    },
    backgroundImage: `url(${videoBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  }
}

const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box className='section' sx={ { flexDirection: 'column', px: '24px' } }>
      <TitleWithDescription
        description={ t('guestHomePage.whoWeAre.description') }
        descriptionVariant={ descriptionVariant }
        title={ t('guestHomePage.whoWeAre.title') }
        titleVariant={ titleVariant }
      />

      <Box sx={ styles.videoWrapper }>
        <Box
          alt='Video' component='img' src={ videoImg }
          sx={ { maxWidth: '100%' } }
        />
      </Box>

    </Box>
  )
}

export default WhoWeAre
