import backGround500 from '~/assets/img/error-page/500.svg'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh'
  },
  wrapper: {
    width: '1250px',
    height: { md: '436px', sm: '750px', xs: '550px' },
    display: 'flex',
    flexDirection: { md: 'column', sm: 'row', xs: 'row' },
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundImage: `url(${backGround500})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: { md: 'right', sm: 'bottom', xs: 'bottom' },
    backgroundSize: 'contain'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: { md: 'flex-start', sm: 'center', xs: 'center' },
    width: { md: '488px', sm: '600px', xs: '320px' },
    height: '256px'
  },
  title: {
    lineHeight: { md: '61px', sm: '74px', xs: '50px' },
    fontSize: { md: '61px', sm: '45px', xs: '32px' },
    fontWeight: '300',
    color: 'primary.900',
    marginBottom: '16px'
  },
  description: {
    textAlign: { md: 'start', sm: 'center', xs: 'center' },
    lineHeight:{ md:'24px',sm:'24px',xs:'18px' },
    fontSize:{ md:'16px',sm:'16px',xs:'14px' },
    letterSpacing: '0.5px',
    color: 'primary.900',
    marginBottom: '40px',
  },
  homeBtn: {
    width: '194px',
    height: '56px',
    backgroundColor: 'primary.900',
    borderRaidus: '4px',
    boxShadow: mainShadow
  }
}
