import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { style } from './styles/internal-server-error.styles'
import backGround500 from '~/assets/img/error-page/500.svg'

const InternalServerError = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container }>
      <Box sx={ style.wrapper }>
        <Box sx={ style.leftBlock }>
          <Typography sx={ style.title } variant={ 'h2' }>
            { t('errorPage.500.title') }
          </Typography>
          <Typography sx={ style.description } variant={ 'subtitle1' }>
            { t('errorPage.500.description') }
          </Typography>
          <Button
            component={ Link } sx={ style.homeBtn } to={ guestRoutes.home.path }
            variant='contained'
          >
            { t('button.toMain') }
          </Button>
        </Box>
        <Box
          alt='errorLogo' component='img' src={ backGround500 }
          sx={ style.image }
        ></Box>
      </Box>
    </Box>
  )
}

export default InternalServerError
