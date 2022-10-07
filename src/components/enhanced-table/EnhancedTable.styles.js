import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    mb: '35px',
    '& .MuiPaper-root': {
      mt: '0'
    }
  },
  paper: {
    mt: '10px',
    boxShadow: mainShadow
  },
  noMatches: {
    backgroundColor: 'basic.grey',
    color: 'primary.700',
    typography: 'subtitle1',
    fontSize: '20px',
    py: '26px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 1
  }
}
