import { TypographyVariantEnum } from '~/types'

export const styles = {
  inputWithIcons: {
    display: 'flex',
    columnGap: '10px',
    flex: 1
  },
  input: {
    flex: 1,
    typography: TypographyVariantEnum.Subtitle2
  },
  actions: { maxHeight: '36px' },
  actionIcon: (color: string, disabled?: boolean) => ({
    width: '16px',
    height: '16px',
    p: '4px',
    borderRadius: '6px',
    ...(!disabled && { color: `${color}.700` }),
    ...(!disabled && { backgroundColor: `${color}.100` })
  })
}
