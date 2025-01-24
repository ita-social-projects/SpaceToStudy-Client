import { TypographyVariantEnum } from '~/types'
import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(1),
    mt: theme.spacing(1)
  },
  chip: {
    bgcolor: 'primary.900',
    borderRadius: 1,
    fontWeight: 600,
    color: 'white',
    typography: TypographyVariantEnum.Subtitle2,
    p: theme.spacing(0.5),
    width: 'fit-content'
  },
  title: {
    typography: TypographyVariantEnum.Overline,
    fontWeight: '400',
    color: 'primary.600',
    lineHeight: '12px'
  }
}

export default styles
