import { Theme } from '@mui/material'

export const styles = {
  container: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }),
  searchBox: (theme: Theme) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '285px'
    }
  }),
  filterInput: {
    width: '100%'
  },
  selectContainer: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '50px',
    margin: '-20px 0 20px 0',
    [theme.breakpoints.up('md')]: {
      margin: '0px 0 0 0'
    }
  })
}
