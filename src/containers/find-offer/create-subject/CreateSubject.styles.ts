export const styles = {
  root: {
    display: 'flex',
    maxWidth: '935px',
    p: { xs: '50px 20px', sm: '50px 80px', md: '70px 90px' },
    justifyContent: 'space-between',
    gap: '70px',
    alignItems: 'center'
  },
  titleDescription: {
    wrapper: { mb: '20px' },
    title: {
      typography: 'h4',
      color: 'primary.600',
      lineHeight: '40px',
      mb: '12px'
    },
    description: { color: 'primary.700' }
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '395px',
    pb: '35px'
  },
  imgWrapper: { maxWidth: '470px', display: { xs: 'none', md: 'flex' } },
  img: { width: '100%' },
  inputTitle: {
    typography: 'body2',
    color: 'primary.500',
    textAlign: 'left',
    mb: '6px'
  },
  button: {
    mt: '20px',
    width: { xs: '100%', sm: 'fit-content' },
    minWidth: '280px'
  },
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '8px'
  }
}
