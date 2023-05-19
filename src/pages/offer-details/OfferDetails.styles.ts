const border = {
  boxShadow: 'none',
  border: '1px solid',
  borderColor: 'primary.100'
}

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '20px',
    mb: '100px'
  },
  wrapper: {
    ...border,
    p: { xs: '16px 20px', sm: '35px 60px' }
  },
  offerCard: {
    ...border,
    p: { sm: '20px 20px', md: '20px 30px' }
  },
  offerCardSquare: border
}
