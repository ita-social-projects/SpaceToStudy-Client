import React from 'react'
import { Box } from '@mui/system'
import { Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { style } from './styles/internal-server-error.styles'
import backGround500 from '~/assets/img/error-page/500.svg'

const InternalServerError = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container }>
      <Box sx={ style.wrapper }>
        <Box sx={ style.leftBlock }>
          <Typography data-testid='title' sx={ style.title } variant={ 'h2' }>
            { t('errorPage.500.title') }
          </Typography>
          <Typography data-testid='description' sx={ style.description } variant={ 'subtitle1' }>
            { t('errorPage.500.description') }
          </Typography>
          <Button href="/" sx={ style.homeBtn } variant="contained">
            <Typography sx={ { letterSpacing: '0.5px', color: 'white', textDecoration: 'none' } } variant={ 'subtitle1' }>
              { t('button.toMain') }
            </Typography>
          </Button>
        </Box>
        <Box
          alt="errorLogo" component="img" src={ backGround500 }
          sx={ style.image }
        ></Box>
      </Box>
    </Box>
  )
}

export default InternalServerError
