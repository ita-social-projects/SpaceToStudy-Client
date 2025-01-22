import { TypographyVariantEnum } from '~/types'
import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  wrapper: {
    position: 'sticky'
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
  }
}

export default styles
