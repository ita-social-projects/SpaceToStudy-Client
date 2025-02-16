import { TypographyVariantEnum } from '~/types'
import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  wrapper: {
    position: 'sticky'
  },
  divider: {
    color: 'primary.300',
    my: theme.spacing(4)
  },
  quizzesWrapper: {
    maxWidth: '936px',
    width: '100%',
    mx: 'auto'
  },
  titleWithDescription: {
    title: {
      typography: TypographyVariantEnum.H5,
      mb: theme.spacing(2)
    },
    description: {
      typography: TypographyVariantEnum.Body1,
      color: 'primary.600'
    }
  },
  attemptTypographyWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  attemptWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(5)
  },
  typography: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.500'
  }
}

export default styles
