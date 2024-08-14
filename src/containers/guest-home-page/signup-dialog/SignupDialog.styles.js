import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

export const styles = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: { lg: '63px', md: '40px' }
  },
  imgContainer: {
    width: '100%',
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: '96px'
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
    pt: { xs: '24px', sm: '40px', lg: '56px' },
    pl: { xs: '8px', sm: '96px', md: '16px' }
  },
  title: {
    mb: '8px',
    fontSize: '32px',
    lineHeight: '48px',
    pr: { xs: '8px', sm: '96px', md: '80px', lg: '96px' }
  },
  form: {
    overflow: 'auto',
    maxWidth: '365px',
    pt: '16px',
    pr: { xs: '8px', sm: '96px', md: '80px', lg: '96px' },
    pb: { xs: '24px', sm: '40px', lg: '56px' },
    ...scrollbar
  }
}
