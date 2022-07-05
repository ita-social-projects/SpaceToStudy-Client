import React from 'react'
import { Box } from '@mui/system'
import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
          <Button sx={ style.homeBtn } variant="contained">
            <Typography
              component={ Link }
              sx={ { letterSpacing: '0.5px', color: 'white', textDecoration: 'none' } }
              to="/"
              variant={ 'subtitle1' }
            >
              { t('button.toMain') }
            </Typography>
          </Button>
        </Box>
        <Box component="img" src={ backGround500 } sx={ style.image }></Box>
      </Box>
    </Box>
  )
}

export default InternalServerError
