import 'allotment/dist/style.css'
import 'simplebar-react/dist/simplebar.min.css'

import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    position: 'relative',
    mb: 0,
    '& .sash-module_sash__K-9lB': {
      '&:before': {
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    },
    '& .sash-module_sash__K-9lB.sash-module_hover__80W6I': {
      '&:before': {
        backgroundColor: 'transparent'
      }
    },
    '& .allotment-module_splitView__L-yRc.allotment-module_separatorBorder__x-rDS > .allotment-module_splitViewContainer__rQnVa > .allotment-module_splitViewView__MGZ6O:not(:first-of-type)':
      {
        '&:before': {
          backgroundColor: 'transparent'
        }
      }
  },
  chatContent: (selectedChat: boolean, messagesLength: number) => ({
    display: 'flex',
    height: '100%',
    alignItems: selectedChat ? 'normal' : 'center',
    justifyContent: selectedChat ? 'normal' : 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
    backgroundColor: 'primary.50',
    p: '8px 8px 16px',
    '& .simplebar-content': { margin: messagesLength ? 'auto 0 0' : 'auto' },
    '& .simplebar-content-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      padding: '9px 16px 0'
    }
  }),
  loader: { color: 'primary.700' },
  chip: { backgroundColor: 'basic.white' },
  chipWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `calc(100% - 164px)`,
    marginBottom: '3px'
  },
  warningChip: {
    backgroundColor: 'basic.white',
    m: 'auto',
    p: '5px',
    '& svg': {
      color: 'warning.800'
    }
  },
  warningLabel: {
    display: 'flex',
    gap: '10px',
    color: 'primary.600',
    typography: TypographyVariantEnum.Body1
  },
  chipLabel: (small: boolean) => ({
    typography: small
      ? TypographyVariantEnum.Body1
      : TypographyVariantEnum.MidTitle,
    color: 'primary.400',
    fontWeight: 500
  }),
  messagesWithDate: { mb: '24px' },
  scrollableContent: {
    height: `calc(100% - 164px)`,
    overflow: 'auto',
    marginBottom: '3px'
  },
  sidebarPaper: { p: 0 },
  sidebar: {
    '& .MuiDrawer-root': { position: 'absolute' },
    '& .MuiPaper-root': {
      position: 'absolute',
      maxWidth: '320px',
      width: '100%'
    }
  }
}
