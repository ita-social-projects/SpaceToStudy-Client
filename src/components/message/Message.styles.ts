import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: (isMyMessage: boolean, isVisible: boolean) => ({
    display: 'flex',
    justifyContent: isMyMessage ? 'end' : 'normal',
    alignItems: !isMyMessage ? 'center' : 'normal',
    columnGap: '8px',
    m: isVisible ? '24px 0 0' : '8px 0 0 52px'
  }),
  avatar: {
    width: '44px',
    height: '44px',
    '&:hover': { transform: 'scale(1.1)' }
  },
  message: (isMyMessage: boolean) => ({
    boxSizing: 'border-box',
    maxWidth: '520px',
    display: 'inline-block',
    alignItems: 'end',
    borderRadius: isMyMessage ? '12px 1px 12px 12px' : '1px 12px 12px 12px',
    backgroundColor: `primary.${isMyMessage ? 500 : 100}`,
    color: `primary.${isMyMessage ? 50 : 900}`,
    typography: TypographyVariantEnum.Body1,
    p: '8px 16px'
  }),
  findMessageCard: (isMyMessage: boolean, isFiltered: boolean) => ({
    backgroundColor: isFiltered
      ? `basic.${isMyMessage ? 'turquoiseDark' : 'turquoiseChat'}`
      : `primary.${isMyMessage ? 500 : 100}`
  }),
  date: (isMyMessage: boolean) => ({
    typography: TypographyVariantEnum.Caption,
    color: `primary.${isMyMessage ? 100 : 500}`,
    float: 'right',
    userSelect: 'none',
    m: '4px 0 0 8px'
  })
}
