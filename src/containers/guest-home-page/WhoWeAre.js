import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import Heading from '~/components/heading/Heading'
import videoImg from '~/assets/img/guest-home-page/videoImg.svg'

const style = {
  container: {
    mx: {
      sm: '24px',
      xs: '16px'
    },
    marginBottom: '71px',
  },
  video: {
    maxWidth: '100%'
  }
}


const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container }>
      <Heading description={ t('guestHomePage.whoWeAre.description') } title={ t('guestHomePage.whoWeAre.title') } />

      <Box
        alt='Video' component='img' src={ videoImg }
        sx={ style.video }
      />
    </Box>
  )
}

export default WhoWeAre
