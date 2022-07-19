import { Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { routes } from '~/constants/routes'
import useBreakpoints from '~/hooks/use-breakpoints'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import img from '~/assets/img/error-page/400.svg'
import { styles } from './styles/bad-request.styles'

const BadRequest = () => {
  const { t } = useTranslation()
  const windowSize = useBreakpoints()

  const sizesTypography = {
    desktop: { title: 'h2', description: 'subtitle1' },
    tablet: { title: 'h3', description: 'subtitle1' },
    mobile: { title: 'h4', description: 'subtitle2' }
  }

  return (
    <Container sx={ styles.container }>
      <Box sx={ styles.info }>
        <TitleWithDescription
          description={ t('errorPage.400.description') }
          descriptionStyles={ { typography: sizesTypography[windowSize].description } }
          title={ t('errorPage.400.title') }
          titleStyles={ { typography: sizesTypography[windowSize].title } }
        />
        <Button
          component={ Link }
          size='extraLarge'
          to={ routes.home.route }
          variant="contained"
        >
          { t('button.toMain') }
        </Button>
      </Box>
      <Box
        alt="man"
        component="img"
        src={ img }
        sx={ styles.img }
      />
      
    </Container>
  )
}

export default BadRequest
