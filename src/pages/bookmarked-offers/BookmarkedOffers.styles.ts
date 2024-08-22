import { VisibilityEnum } from '~/types'
import {
  commonHoverShadow,
  commonShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  button: {
    m: '32px auto 0',
    boxShadow: commonShadow,
    '&:hover': {
      boxShadow: commonHoverShadow
    }
  },
  titleWithDescription: {
    wrapper: {
      my: { xs: '20px', sm: '30px' },
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },
  offersSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    typography: { sm: 'h4', xs: 'h5' },
    textAlign: 'center'
  },
  pagination: (hide: boolean) => ({
    visibility: hide ? VisibilityEnum.Hidden : VisibilityEnum.Visible
  })
}
