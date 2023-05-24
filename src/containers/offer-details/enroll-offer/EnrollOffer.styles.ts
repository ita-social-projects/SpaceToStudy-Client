export const styles = {
  root: {
    display: 'flex',
    maxWidth: '935px',
    p: { xs: '40px 60px', lg: '70px 90px' },
    justifyContent: 'space-between',
    gap: { xs: '60px', md: '120px', lg: '140px' },
    alignItems: 'center'
  },
  offerCard: {
    p: '20px',
    maxWidth: '320px',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: '360px',
    pb: '35px'
  },
  titleDescription: {
    wrapper: { color: 'primary.600' },
    title: { typography: 'h4' },
    description: { typography: 'midTitle' }
  },
  select: { flexDirection: 'column', alignItems: 'start', gap: '8px' },
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '8px'
  },
  button: { p: '12px 24px', width: 'fit-content', minWidth: '280px' }
}
