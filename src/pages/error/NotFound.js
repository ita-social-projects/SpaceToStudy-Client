import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Typography, Button, Box } from '@mui/material'
import { routes } from '~/constants/routes'
import plantImg from '~/assets/img/error-page/404-plant.svg'
import manImg from '~/assets/img/error-page/404-man.svg'

import { style } from '~/pages/error/styles/not-found.style'


const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.root }>
      
      <Box sx={ style.box }>
        <Typography sx={ style.title } variant={ 'h2' }>
          { t('errorPage.404.title') }
        </Typography>
        <Typography sx={ style.description } variant={ 'subtitle1' }>
          { t('errorPage.404.description') }
        </Typography>
        <Button
          component={ Link } sx={ style.button }
          to={ routes.home.route } variant="contained"
        >
          { t('button.toMain') }
        </Button>
      </Box>

      <Box sx={ style.imgBox }>
        <Box
          alt="man with bag" component="img" src={ manImg }
          sx={ style.manImg }
        />
        <Box
          alt="flowerpot " component="img" src={ plantImg }
          sx={ style.plantImg }
        />
      </Box>
    </Box>
  )
}

export default NotFound
