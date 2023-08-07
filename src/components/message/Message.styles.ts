import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: (isMyMessage: boolean) => ({
    display: 'flex',
    justifyContent: isMyMessage ? 'end' : 'normal',
    alignItems: !isMyMessage ? 'center' : 'normal',
    columnGap: '8px',
    mt: '24px'
  }),
  avatar: {
    width: '48px',
    height: '48px',
    '&:hover': { transform: 'scale(1.1)' }
  },
  messageCard: (isMyMessage: boolean) => ({
    boxSizing: 'border-box',
    maxWidth: '520px',
    display: 'inline-block',
    alignItems: 'end',
    borderRadius: '12px',
    borderTopLeftRadius: '1px',
    backgroundColor: `primary.${isMyMessage ? 500 : 100}`,
    color: `primary.${isMyMessage ? 50 : 900}`,
    typography: TypographyVariantEnum.Body1,
    p: '8px 16px'
  }),
  date: (isMyMessage: boolean) => ({
    typography: TypographyVariantEnum.Caption,
    color: `primary.${isMyMessage ? 100 : 500}`,
    float: 'right',
    userSelect: 'none',
    m: '4px 0 0 8px'
  })
}
