import React from 'react'
import { useTranslation } from 'react-i18next'
import './errorPages.styles'
import { useStyles } from './errorPages.styles'
import { Button, Typography } from '@mui/material'

const AuthPolicy = () => {
  const styles = useStyles()
  const { t } = useTranslation()

  return (
    <div className={ styles.root }>
      <Typography variant="h3">
        { t('errorPage.authTitle') }
      </Typography>
      <Typography variant="body2">
        { t('errorPage.authText') }
      </Typography>
      <Button
        variant="contained"
      >
        { t('buttons.toMain') }
      </Button>
    </div>
  )
}

export default AuthPolicy
