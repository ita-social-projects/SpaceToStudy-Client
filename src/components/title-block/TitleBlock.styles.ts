import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'companyBlue',
    alignItems: 'center',
    borderRadius: 2,
    px: { md: 7, xs: 3 },
    py: { sm: 9, xs: 4 },
    pr: { lg: 15 }
  },
  info: {
    minWidth: '60%'
  },
  form: {
    display: 'flex',
    flexWrap: { sm: 'nowrap', xs: 'wrap' }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left',
      mb: '8px',
      width: { md: '80%' }
    },
    title: {
      typography: {
        xs: TypographyVariantEnum.H5,
        sm: TypographyVariantEnum.H4
      },
      color: 'primary.900',
      mb: 1
    },
    description: {
      typography: {
        sm: TypographyVariantEnum.Body1,
        xs: TypographyVariantEnum.Body2
      },
      color: 'primary.900',
      mb: 3,
      whiteSpace: { md: 'pre-line' }
    }
  }
}
