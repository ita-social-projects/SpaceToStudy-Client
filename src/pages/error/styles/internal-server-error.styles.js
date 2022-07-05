import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh'
  },
  wrapper: {
    height: { md: '440px', sm: '800px', xs: '560px' },
    padding: { md: '15px' },
    overflow: 'hidden',
    display: 'flex',
    flexDirection: { md: 'row', xs: 'column' },
    justifyContent: { md: 'center', xs: 'space-around' },
    alignItems: 'center'
  },
  leftBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: { md: 'flex-start', xs: 'center' },
    maxWidth: { md: '488px', sm: '531px', xs: '343px' }
  },
  image: {
    maxWidth: { md: '834px', sm: '629px', xs: '340px' },
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
    lineHeight: { sm: '24px', xs: '18px' },
    fontSize: { sm: '16px', xs: '14px' },
    letterSpacing: '0.5px',
    color: 'primary.900',
    mb: '40px'
  },
  homeBtn: {
    width: '194px',
    height: '56px',
    backgroundColor: 'primary.900',
    borderRaidus: '4px',
    boxShadow: mainShadow
  }
}
