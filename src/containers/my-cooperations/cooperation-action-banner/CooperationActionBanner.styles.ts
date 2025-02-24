import { type SxProps } from '@mui/material'

import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    padding: '24px',
    borderTop: `4px solid ${palette.basic.mediumRed}`,
    borderRadius: '5px',
    backgroundColor: palette.basic.softWhite,
    boxShadow:
      '0px 8px 16px rgba(0, 0, 0, 0.1), 0px 0px 6px rgba(0, 0, 0, 0.08)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '8px',
    color: palette.basic.mediumRed
  },
  headerText: {
    fontWeight: 'medium',
    fontSize: '18px'
  },
  description: {
    color: palette.basic.lightBlue,
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
