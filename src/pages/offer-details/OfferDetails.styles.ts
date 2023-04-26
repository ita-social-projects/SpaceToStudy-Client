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
    gap: '20px'
  },
  wrapper: {
    ...border,
    p: '35px 60px'
  },
  offerCard: border
}
