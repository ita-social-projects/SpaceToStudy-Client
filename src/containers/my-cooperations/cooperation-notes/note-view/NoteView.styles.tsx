import palette from '~/styles/app-theme/app.pallete'
import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum } from '~/types'

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

const getBackgroundColor = (currentUser: boolean, isPrivate: boolean) => {
  if (currentUser) {
    if (isPrivate) {
      return palette.basic.grey
    } else {
      return palette.basic.white
    }
  } else {
    return palette.basic.turquoiseLight
  }
}

export const styles = {
  container: (currentUser: boolean, isPrivate: boolean) => ({
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    p: '20px',
    mt: '24px',
    borderRadius: '2px 2px 6px 6px',
    borderTop: '4px solid',
    borderColor: isPrivate ? 'basic.blueGray' : 'basic.turquoise',
    background: getBackgroundColor(currentUser, isPrivate),
    '&:hover': {
      boxShadow: commonHoverShadow
    }
  }),
  descriptionInput: {
    style: {
      marginTop: 0
    },
    disableUnderline: true
  },
  descriptionLabel: {
    sx: { typography: TypographyVariantEnum.Body1, top: -14 },
    shrink: false
  },
  input: {
    style: { padding: 0, margin: 0 }
  },
  textfield: {
    pointerEvents: 'none',
    '& .css-mz8ttg-MuiFormHelperText-root': {
      display: 'none'
    }
  },
  header: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lockIcon: {
    color: 'primary.300'
  },
  menuBlock: {
    alignSelf: 'flex-end'
  },
  date: {
    color: 'primary.400'
  },
  iconWrapper: actionIconWrapper,
  icon: actionIcon,
  deleteIconWrapper: { ...actionIconWrapper, color: 'error.700' },
  deleteIcon: {
    ...actionIcon,
    color: 'error.700'
  },
  accountIcon: {
    typography: TypographyVariantEnum.Button,
    color: 'primary.900'
  }
}
