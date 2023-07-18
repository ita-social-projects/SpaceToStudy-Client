import { TypographyVariantEnum } from '~/types'

export const styles = {
  userInfoStyles: {
    root: {
      flexDirection: 'row',
      gap: '9px'
    },
    avatar: {
      width: '48px',
      height: '48px'
    },
    info: {
      alignItems: 'baseline',
      gap: '8px'
    },
    myInfo: {
      flexDirection: 'row-reverse'
    },
    interlocutorInfo: {
      flexDirection: 'row'
    },
    name: {
      typography: TypographyVariantEnum.Subtitle2,
      color: 'primary.900'
    },
    date: {
      typography: TypographyVariantEnum.Caption
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    mb: '32px'
  },
  myMessageRoot: {
    alignItems: 'flex-end'
  },
  interlocutorMessageRoot: {
    alignItems: 'flex-start'
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '520px',
    borderRadius: '12px',
    p: '8px 12px'
  },
  myMessageBox: {
    backgroundColor: 'primary.500',
    color: 'primary.50',
    borderTopRightRadius: '1px',
    mt: '8px'
  },
  interlocutorMessageBox: {
    backgroundColor: 'primary.100',
    color: 'primary.900',
    borderTopLeftRadius: '1px',
    ml: '57px',
    transform: 'translateY(-20px)'
  },
  messageContent: {
    typography: TypographyVariantEnum.Body1
  }
}
