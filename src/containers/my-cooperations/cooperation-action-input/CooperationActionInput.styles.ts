import { type SxProps } from '@mui/material'

import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  inputBox: {
    mb: '8px'
  },
  inputContainer: {
    display: 'flex',
    gap: '16px',
    height: '50px',
    mt: '10px'
  },
  inputField: {
    flex: 1
  },
  textGray: {
    color: palette.basic.darkGray
  }
} satisfies Record<string, SxProps>
