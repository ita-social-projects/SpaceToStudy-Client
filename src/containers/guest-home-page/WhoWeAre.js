import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { routes } from '~/constants/routes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import videoImg from '~/assets/img/guest-home-page/videoImg.png'
import videoBar from '~/assets/img/guest-home-page/videoBar.png'

const sectionId = routes.guestNavBar.whoWeAre.label

const titleVariant = {
  md: 'h3',
  xs: 'h4'
}

const descriptionVariant = {
  xs: 'subtitle1'
}

const styles = {
  videoBg: {
    padding: {
      md: '32px 96px',
      sm: '20px 60px',
      xs: '20px 12px',
    }
  }
}

const WhoWeAre = () => {
  const { t } = useTranslation()

  return (
    <Box className='section' id={ sectionId } sx={ { flexDirection: 'column', px: '16px' } }>
      <TitleWithDescription
        description={ t('guestHomePage.whoWeAre.description') }
        descriptionVariant={ descriptionVariant }
        title={ t('guestHomePage.whoWeAre.title') }
        titleVariant={ titleVariant }
      />
      <Box
        data-testid='video section' sx={ { backgroundColor: 'basic.grey', borderRadius: '18px' } }
      >
        <Box
          alt='Video bar' component='img' src={ videoBar }
          sx={ { maxWidth: '100%' } }
        />
        <Box sx={ styles.videoBg }>
          <Box
            alt='Video' component='img' src={ videoImg }
            sx={ { maxWidth: '100%' } }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default WhoWeAre
