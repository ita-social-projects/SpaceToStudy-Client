import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    p: '15px 0 35px 0'
  },
  paper: {
    mt: '10px',
    boxShadow: mainShadow
  },
  tools: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    mr: '20px'
  },
  tabs: {
    display: 'flex',
    pt: '20px'
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
