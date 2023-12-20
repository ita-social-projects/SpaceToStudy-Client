export const styles = {
  tabs: {
    display: 'flex',
    borderBottom: '1px solid',
    borderColor: 'primary.100',
    mb: '24px',
    overflowX: 'auto',
    '&::-webkit-scrollbar': { display: 'none' }
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '& > svg': {
      width: '16px',
      height: '16px'
    }
  }
}
