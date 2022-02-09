import React from 'react'
import { useTranslation } from 'react-i18next'
import './errorPages.styles'
import { useStyles } from './errorPages.styles'
import { Container, Typography } from '@mui/material'
import  HomeButton  from './home-button'

const AuthPolicy = () => {
  const styles = useStyles()
  const { t } = useTranslation()

  return (
    <div>
      <Container className={ styles.root } maxWidth="lg">
        <div className={ styles.text }>
          <Typography component="h1" gutterBottom  variant="h3">
            { t('errorPage.authTitle') }
          </Typography>
          <Typography component="p" gutterBottom variant="body2">
            { t('errorPage.authText') }
          </Typography>
          <HomeButton />
        </div>
      </Container>
    </div>
  )
}

export default AuthPolicy
