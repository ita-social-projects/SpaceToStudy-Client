import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: { px: '45px' },
  divider: { '&::before, &::after': { borderColor: 'primary.200' } },
  date: {
    mx: '10px',
    userSelect: 'none',
    typography: TypographyVariantEnum.Caption,
    color: 'primary.500'
  }
}
