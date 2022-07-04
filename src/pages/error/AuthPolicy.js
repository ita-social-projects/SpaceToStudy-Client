import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles/auth-policy.styles'
import { useStyles } from './styles/auth-policy.styles'
import { Button, Typography } from '@mui/material'

const AuthPolicy = () => {
  const styles = useStyles()
  const { t } = useTranslation()

  return (
    <div className={ styles.root }>
      <Typography variant="h3">
        { t('errorPage.401.authTitle') }
      </Typography>
      <Typography variant="body2">
        { t('errorPage.401.authText') }
      </Typography>
      <Button
        variant="contained"
      >
        { t('button.toMain') }
      </Button>
    </div>
  )
}

export default AuthPolicy
