import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  main: {
    position: 'sticky',
    top: '10px',
    zIndex: '2'
  },
  root: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    p: '20px',
    gap: '10px',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: commonHoverShadow
  },
  userInfo: {
    root: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    name: {
      typography: TypographyVariantEnum.H6,
      p: '12px'
    }
  },
  mainBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    gap: '16px'
  },
  bookmarkButton: {
    ml: '16px'
  },
  buttonsBlock: {
    display: 'flex'
  },
  chipsContainer: {
    ml: '12px'
  }
}
