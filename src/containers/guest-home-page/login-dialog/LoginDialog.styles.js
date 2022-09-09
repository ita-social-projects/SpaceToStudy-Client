import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
  },
  imgContainer: {
    maxWidth: { md: '50%', lg: '593px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '64px' },
    pl: { xs: '8px', sm: '96px', md: '16px' }
  },
  title: {
    mb: '16px',
    fontSize: '40px',
    lineHeight: '48px'
  },
  form: {
    overflow: 'auto',
    maxWidth: '343px',
    pt: '16px',
    pr: { xs: '8px', sm: '96px', md: '80px', lg: '96px' },
    pb: { xs: '24px', sm: '64px' },
    ...scrollbar
  }
}

export default style
