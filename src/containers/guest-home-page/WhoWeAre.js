import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import videoImg from '~/assets/img/guest-home-page/videoImg.svg'

const titleVariant = {
  md: 'h3',
  xs: 'h4'
}

const descriptionVariant = {
  xs: 'subtitle1'
}

const style = {
  container: {
    marginBottom: '70px',
  },
  videoWrapper : {
    px: '24px'
  },
  video: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
  }
}


const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container }>
      <TitleWithDescription
        description={ t('guestHomePage.whoWeAre.description') }
        descriptionVariant={ descriptionVariant }
        title={ t('guestHomePage.whoWeAre.title') }
        titleVariant={ titleVariant }
      />

      <Box sx={ style.videoWrapper }>
        <Box
          alt='Video' component='img' src={ videoImg }
          sx={ style.video }
        />
      </Box>
    </Box>
  )
}

export default WhoWeAre
