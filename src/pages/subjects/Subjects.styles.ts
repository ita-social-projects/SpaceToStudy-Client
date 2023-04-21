export const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    mt: '80px'
  },
  componentStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mb: { xs: '20px', sx: '30px' }
  },
  sectionTitle: {
    typography: { sm: 'h4', xs: 'h5' }
  },
  categoryInput: {
    width: '100%',
    maxWidth: { sm: '220px' },
    mr: '30px',
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  sectionDescription: {
    maxWidth: { xs: '200px', sm: '100%' },
    typography: { sm: 'body1', xs: 'body2' }
  },
  searchToolbar: {
    borderRadius: '70px'
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    m: '0 45px 20px 0'
  }
}
