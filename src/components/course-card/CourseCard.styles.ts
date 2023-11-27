import { TypographyVariantEnum } from '~/types'
import { ellipsisTextStyle } from '~/utils/helper-functions'

export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '395px',
    minHeight: '245px',
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: '24px 24px 16px',
    mt: '32px'
  },
  title: {
    typography: TypographyVariantEnum.H5,
    ...ellipsisTextStyle(2),
    fontWeight: '600',
    lineHeight: '24px',
    letterSpacing: '0.15px'
  },
  description: {
    typography: TypographyVariantEnum.Body1,
    ...ellipsisTextStyle(2),
    m: '8px 0px'
  },
  secondaryText: {
    typography: TypographyVariantEnum.Body2,
    color: 'basic.turquoiseDark',
    m: '8px 0px'
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    m: '16px 0'
  },
  chipContainer: {
    position: 'relative'
  }
}
