import { TypographyVariantEnum } from '~/types'
import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  wrapper: {
    gap: theme.spacing(0.5)
  },
  title: {
    typography: TypographyVariantEnum.Overline
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    marginTop: theme.spacing(0.5)
  },
  info: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.800'
  },
  divider: {
    borderWidth: '2px',
    borderRadius: '50%',
    backgroundColor: 'var(--s2s-neutral-450)'
  }
}

export default styles
