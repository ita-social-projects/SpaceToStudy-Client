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
  button: {
    whiteSpace: 'nowrap',
    p: '15px 30px',
    width: 'auto',
    lineHeight: '19px'
  },
  bookmarkButton: {
    color: 'primary.500',
    p: '12px 30px',
    ml: '16px'
  },
  bookmarkButtonText: {
    color: 'primary.500',
    display: 'flex',
    alignItems: 'center',
    ml: '8px'
  },
  buttonsBlock: {
    display: 'flex'
  },
  chipsContainer: {
    ml: '12px'
  }
}
