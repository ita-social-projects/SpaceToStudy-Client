import React from 'react'
import { useTranslation } from 'react-i18next'
import './errorPages.css'
import { Button } from '@mui/material'

const AuthPolicy = () => {
  const { t } = useTranslation()

  return (
    <div className="root">
      <div className="container">
        <div className="text">
          <h1>
            { t('errorPage.authTitle') }
          </h1>
          <p>
            { t('errorPage.authText') }
          </p>
          <Button className="button" variant="contained">
            { t('button.toMain') }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuthPolicy
