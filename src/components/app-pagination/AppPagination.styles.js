export const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: 'primary.900',
      color: 'primary.50',
      '&:hover': {
        backgroundColor: 'primary.900',
        color: 'primary.50'
      }
    }
  }
}
