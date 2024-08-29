import { VisibilityEnum } from '~/types'

export const styles = {
  title: {
    typography: { xs: 'h5', sm: 'h4' },
    fontSize: { sm: '35px' },
    lineHeight: { sm: '40px' },
    mb: { xs: '20px', sm: '32px' }
  },
  divider: {
    mb: '4px',
    backgroundColor: 'primary.200',
    width: '100%'
  },
  notFound: {
    container: {
      my: '0',
      height: '100%'
    }
  },

  pagination: (hide: boolean) => ({
    visibility: hide ? VisibilityEnum.Hidden : VisibilityEnum.Visible
  })
}
