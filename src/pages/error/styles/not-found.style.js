import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    margin: '0 auto',
    maxWidth: 'lg'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { md: 'flex-start', xs: 'center' },
    position: { sm: 'inherit', md: 'absolute' },
    top: '300px',
    left: '50%',
    m: { md: '0 auto', xs: '65px auto 0' },
    maxWidth: '430px',
    zIndex: '2'
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
    backgroundColor: 'primary.900',
    boxShadow: mainShadow,
  },
  imgBox: {
    display: 'flex',
    justifyContent: 'space-between',
    position: { sm: 'inherit', md: 'relative' },
    width: '90%',
    m: '0 auto'
  },
  manImg: {
    maxWidth: { xs: '285px', sm: '420px', md: '500px' },
    overflow: 'auto'
  },
  plantImg: {
    alignSelf: 'end',
    maxWidth: { md: '200px', sm: '125px', xs: '90px' },
    overflow: 'auto'
  },
}
