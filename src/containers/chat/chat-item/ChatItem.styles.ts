import { TypographyVariantEnum } from '~/types'

const hideText = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
}

export const styles = {
  root: (isActiveChat: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    p: { xs: '12px 16px', sm: '16px 24px' },
    gap: '12px',
    cursor: 'pointer',
    backgroundColor: isActiveChat ? 'primary.50' : 'basic.white'
  }),
  imageWrapper: {
    position: 'relative',
    display: 'block'
  },
  img: {
    width: '48px',
    height: '48px'
  },
  active: {
    width: '12px',
    height: '12px',
    backgroundColor: 'basic.lime',
    border: '3px solid',
    borderColor: 'basic.white',
    borderRadius: '50%'
  },
  mainInformation: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    gap: '6px'
  },
  nameWithTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  fullName: {
    typography: TypographyVariantEnum.MidTitle,
    ...hideText
  },
  lastTimeMessage: {
    whiteSpace: 'nowrap',
    typography: TypographyVariantEnum.Caption,
    color: 'primary.500'
  },
  messageBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px'
  },
  prefix: {
    color: 'primary.700',
    typography: TypographyVariantEnum.Body1
  },
  message: {
    width: '100%',
    marginRight: '28px',
    typography: TypographyVariantEnum.Body1,
    ...hideText
  },
  amountOfmessages: {
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: 'inherit',
    alignItems: 'center',
    backgroundColor: 'error.400',
    color: 'basic.white',
    userSelect: 'none',
    typography: TypographyVariantEnum.Subtitle2
  }
}
