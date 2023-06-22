import { VisibilityEnum } from '~/types'

export const styles = {
  filterSection: {
    display: 'flex'
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
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  popularCategories: {
    margin: { xs: '64px 0 0', sm: '80px 0 0', md: '104px 0 0' },
    p: {
      textAlign: 'start'
    }
  },
  pagination: (hide: boolean) => ({
    visibility: hide ? VisibilityEnum.Hidden : VisibilityEnum.Visible
  })
}
