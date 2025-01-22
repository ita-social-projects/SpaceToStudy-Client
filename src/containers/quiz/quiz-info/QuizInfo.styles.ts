import { TypographyVariantEnum } from '~/types'
import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '48px',
    marginTop: theme.spacing(2)
  },
  divider: {
    borderWidth: '1px',
    height: '32px',
    color: 'var(--s2s-neutral-250)'
  },
  smallDivider: {
    borderWidth: '1px',
    height: '16px',
    color: 'var(--s2s-neutral-250)'
  },
  questionsAnsweredWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px'
  },
  subtitle1: {
    typography: TypographyVariantEnum.Subtitle1
  },
  subtitle2: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.800'
  },
  buttonWrapper: {
    marginLeft: 'auto',
    marginTop: theme.spacing(1)
  }
}

export default styles
