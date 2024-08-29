import { TypographyVariantEnum } from '~/types'
import { ellipsisTextStyle } from '~/utils/helper-functions'
import palette from '~/styles/app-theme/app.pallete'
import {
  commonShadow,
  commonHoverShadow
} from '~/styles/app-theme/custom-shadows'

const actionIconWrapper = {
  display: 'flex',
  alignItems: 'center',
  m: '6px 16px 6px 0',
  typography: TypographyVariantEnum.Subtitle2,
  color: 'primary.700'
}

const actionIcon = {
  fontSize: '16px',
  mr: '10px'
}

export const styles = {
  card: (isSelected: boolean) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '285px',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'basic.white',
    border: `2px solid ${palette.basic.white}`,
    borderRadius: '6px',
    p: '24px 24px 16px',
    boxShadow: commonShadow,
    transition: 'box-shadow 0.3s ease-in-out',
    wordBreak: 'break-word',
    '&:hover': {
      boxShadow: commonHoverShadow
    },
    ...(isSelected && {
      backgroundColor: 'basic.grey',
      border: `2px solid ${palette.basic.gray}`
    })
  }),
  title: {
    typography: TypographyVariantEnum.H5,
    ...ellipsisTextStyle(2),
    fontWeight: '600',
    lineHeight: '28px',
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
  },
  iconWrapper: actionIconWrapper,
  deleteIconWrapper: { ...actionIconWrapper, color: 'error.700' },
  icon: actionIcon,
  deleteIcon: {
    ...actionIcon,
    color: 'error.700'
  }
}
