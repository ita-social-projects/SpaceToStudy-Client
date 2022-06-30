import React from 'react'
import { Box } from '@mui/system'
import { Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { style } from './styles/internal-server-error.styles'

const InternalServerError = () => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.container }>
      <Box sx={ style.wrapper }>
        <Box sx={ { width: '488px', height: '256px' } }>
          <Typography sx={ style.title } variant={ 'h2' }>
            { t('errorPage.500.title') }
          </Typography>
          <Typography sx={ style.description } variant={ 'subtitle1' }>
            { t('errorPage.500.description') }
          </Typography>
          <Button sx={ style.homeBtn } variant="contained">
            <Typography sx={ { letterSpacing: '0.5px', color: 'white' } } variant={ 'subtitle1' }>
              { t('button.toMain') }
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default InternalServerError
