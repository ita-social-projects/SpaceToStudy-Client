import 'simplebar-react/dist/simplebar.min.css'
import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    bottom: '0'
  },
  chatContent: {
    width: '368px',
    height: '528px',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: '0',
    m: '0 15px 65px 0',
    backgroundColor: 'primary.50',
    borderRadius: '6px',
    boxShadow: commonHoverShadow,
    boxSizing: 'border-box'
  },
  chatCreateBox: {
    display: 'flex',
    gap: '10px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'basic.white',
    height: '48px',
    p: '12px 16px',
    borderRadius: '6px'
  },
  message: {
    avatar: {
      width: '32px',
      height: '32px'
    }
  },
  scrollableContent: {
    height: `calc(100% - 164px)`,
    overflow: 'auto',
    marginBottom: '3px',
    padding: '16px 8px'
  },
  userProfileInfo: {
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px'
    },
    name: {
      typography: TypographyVariantEnum.MidTitle,
      color: 'basic.black',
      maxWidth: '180px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }
  },
  firstQuestions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '16px',
    height: '100%',
    mb: '16px'
  },
  question: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.500',
    cursor: 'pointer'
  },
  subtitle: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.500'
  },
  messagesWithDate: { mb: '24px' },
  textArea: {
    container: {
      alignItems: 'center',
      backgroundColor: 'basic.white',
      my: '0',
      borderRadius: '6px'
    },
    icon: {
      width: '24px',
      height: '24px'
    },
    textAreaWrapper: {
      p: '5px 0px'
    }
  },
  icons: {
    color: 'primary.800'
  },
  loader: { color: 'primary.700' },
  warningChip: {
    backgroundColor: 'basic.white',
    mx: '20px',
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
  }
}
