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
  divider: {
    mb: '16px'
  },
  inputField: {
    flex: 1
  },
  textGray: {
    color: palette.basic.lightBlue
  },
  textMediumGray: {
    color: palette.basic.lightBlue,
    fontWeight: 'medium'
  }
} satisfies Record<string, SxProps>
