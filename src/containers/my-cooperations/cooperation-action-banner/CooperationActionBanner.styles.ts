import { type SxProps } from '@mui/material'

import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    padding: '24px',
    border: `1px solid ${palette.basic.pinkishRed}`,
    borderRadius: '5px',
    backgroundColor: palette.basic.softGray
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '8px',
    color: palette.basic.mediumRed
  },
  description: {
    color: palette.basic.darkGray,
    marginTop: '4px'
  },
  mainContentWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    justifyContent: 'space-between',
    gap: '30px'
  },
  buttonsWrapper: {
    display: 'flex',
    columnGap: '15px',
    alignItems: 'center',
    alignSelf: {
      xs: 'end',
      sm: 'auto'
    }
  }
} satisfies Record<string, SxProps>
