import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '485px',
    // columnGap: 2,
    ...fadeAnimation
  },
  imgContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 122px 52px 0'
  },
  img: {
    width: '100%'
    // borderRadius: '20px'
  },
  // imgDesktop: {
  //   mb: '30px',
  //   maxWidth: { lg: '418px', md: '45%' },
  //   width: '100%'
  // },
  // imgMobile: {
  //   display: 'block',
  //   m: '0 auto 20px',
  //   maxWidth: '70%'
  // },
  form: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  formFieldsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      sm: 'repeat(auto-fit, minmax(180px, 1fr))'
    },
    columnGap: 2
  },
  experienceLength: {
    float: 'right',
    mt: '-20px'
  },
  checkboxLabel: {
    '& .MuiFormControlLabel-label': {
      typography: { sm: 'body1', xs: 'body2' }
    }
  }
}
