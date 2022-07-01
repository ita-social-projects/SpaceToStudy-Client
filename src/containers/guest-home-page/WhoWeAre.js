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

const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box className='section' sx={ { flexDirection: 'column' } }>
      <TitleWithDescription
        description={ t('guestHomePage.whoWeAre.description') }
        descriptionVariant={ descriptionVariant }
        title={ t('guestHomePage.whoWeAre.title') }
        titleVariant={ titleVariant }
      />

      <Box sx={ { px: '24px' } }>
        <Box
          alt='Video' component='img' src={ videoImg }
          sx={ { maxWidth: '100%' } }
        />
      </Box>
    </Box>
  )
}

export default WhoWeAre
