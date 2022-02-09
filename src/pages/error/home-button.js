import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'

const HomeButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      sx={ { py: 2, px: 6, mt: 3 }  }
      variant="contained"
    >
      { t('button.toMain') }
    </Button>
  )
}

export default HomeButton