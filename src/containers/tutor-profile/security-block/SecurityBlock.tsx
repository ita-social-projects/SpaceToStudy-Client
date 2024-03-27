import React from 'react'
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import { styles } from './SecurityBlock.styles'
import AppButton from '@mui/material/Button'
import { ButtonVariantEnum, SizeEnum } from '~/types'
import Divider from '@mui/material/Divider'

const SecurityBlock = () => {
  const handlePasswordChange = () => {
    console.log('password change')
  }

  return (
    <Box>
      <Box>
        <Typography sx={styles.title}>Password & Security</Typography>
        <Typography sx={styles.description}>Change your password</Typography>
        <Box>
          <Typography sx={styles.subtitle}>Change password</Typography>
          <AppButton
            onClick={handlePasswordChange}
            size={SizeEnum.Medium}
            sx={styles.saveButton}
            variant={ButtonVariantEnum.Contained}
          >
            Save new password
          </AppButton>
          <AppButton
            onClick={handlePasswordChange}
            size={SizeEnum.Medium}
            sx={styles.saveButton}
            variant={ButtonVariantEnum.Tonal}
          >
            Discard
          </AppButton>
          <Divider />
          <AppButton
            onClick={handlePasswordChange}
            size={SizeEnum.Large}
            sx={styles.deactivateButton}
            variant={ButtonVariantEnum.Contained}
          >
            Deactivate account
          </AppButton>
        </Box>
      </Box>
    </Box>
  )
}

export default SecurityBlock
