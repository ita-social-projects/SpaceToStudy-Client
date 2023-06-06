export const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2,1fr)',
      md: 'repeat(3,1fr)',
      lg: 'repeat(4,1fr)'
    },
    gridAutoRows: 'auto',
    gap: '20px',
    mb: '40px'
  },
  chips: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '4px'
  },
  chip: {
    typography: 'overline'
  },
  table: {
    '& td,th': {
      '&:first-of-type': {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
      },
      '&:last-of-type': {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px'
      }
    }
  }
}
