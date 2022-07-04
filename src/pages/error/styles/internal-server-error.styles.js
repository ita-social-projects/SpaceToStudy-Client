import backGround500 from '~/assets/img/error-page/500.svg'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  wrapper: {
    width: '1250px',
    height: { md: '436px', sm: '850px' },
    display: 'flex',
    flexDirection: { md: 'column', sm: 'row' },
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundImage: `url(${backGround500})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: { md: 'right', sm: 'bottom' }
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: { md: 'flex-start', sm: 'center' },
    width: { md: '488px', sm: '600px' },
    height: '256px'
  },
  title: {
    lineHeight: '61px',
    fontWeight: '300',
    color: 'primary.900',
    marginBottom: '16px'
  },
  description: {
    letterSpacing: '0.5px',
    color: 'primary.900',
    marginBottom: '40px',
    textAlign: { md: 'start', sm: 'center' }
  },
  homeBtn: {
    width: '194px',
    height: '56px',
    backgroundColor: 'primary.900',
    borderRaidus: '4px',
    boxShadow: mainShadow
  }
}
