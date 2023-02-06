import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  wrapper: {
    padding: { md: '64px' },
    overflow: 'hidden',
    display: 'flex',
    flexDirection: { md: 'row', xs: 'column' },
    justifyContent: { md: 'center', xs: 'space-evenly' },
    alignItems: 'center',
    rowGap: {
      sm: '148px',
      xs: '100px'
    }
  },
  leftBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: { md: 'flex-start', xs: 'center' },
    maxWidth: { md: '488px', sm: '531px', xs: '343px' }
  },
  image: {
    maxWidth: { md: '834px', sm: '600px', xs: '340px' },
    overflow: 'auto'
  },
  title: {
    lineHeight: { md: '61px', sm: '74px', xs: '51px' },
    fontSize: { md: '61px', sm: '45px', xs: '32px' },
    fontWeight: '300',
    color: 'primary.900',
    mb: '16px'
  },
  description: {
    textAlign: { md: 'start', xs: 'center' },
    typography: {
      sm: 'subtitle1',
      xs: 'subtitle2'
    },
    letterSpacing: '0.5px',
    color: 'primary.900',
    mb: '40px'
  },
  homeBtn: {
    padding: '15px 50px',
    backgroundColor: 'primary.900',
    borderRaidus: '4px',
    boxShadow: mainShadow
  }
}
