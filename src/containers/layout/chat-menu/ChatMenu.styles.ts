import { TypographyVariantEnum } from '~/types'

export const styles = {
  menuItem: (isDangerous: boolean) => ({
    minWidth: '300px',
    p: '15px 24px',
    gap: '16px',
    color: isDangerous ? 'error.900' : 'primary.900',
    typography: TypographyVariantEnum.MidTitle
  })
}
