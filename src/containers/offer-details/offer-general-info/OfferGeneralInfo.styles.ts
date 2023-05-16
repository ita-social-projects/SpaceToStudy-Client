export const styles = {
  container: {
    width: '100%'
  },
  title: {
    color: 'primary.700',
    typography: { xs: 'h6', sm: 'h5' }
  },
  cardsContainer: {
    mt: { xs: '20px', sm: '30px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  card: {
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'primary.100',
    p: 0
  },
  iconTitleDescription: {
    container: {
      display: 'flex',
      alignItems: 'start',
      width: '100%',
      p: { xs: '10px 15px', sm: '25px' },
      color: 'primary.500'
    },
    icon: {
      display: { xs: 'none', sm: 'block' },
      svg: {
        width: '40px',
        height: '40px'
      }
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: { xs: '10px', sm: '15px' },
      mx: { xs: 0, sm: '20px', md: '35px' }
    },
    title: {
      typography: { xs: 'subtitle2', sm: 'h6' }
    },
    description: {
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(1, minmax(170px, 1fr))',
        sm: 'repeat(2, minmax(170px, 1fr))',
        md: 'repeat(3, minmax(170px, 1fr))'
      },
      gap: { xs: '10px 0px', md: '10px 40px' },
      typography: { xs: 'body2', sm: 'body1' }
    }
  }
}
