import backGround500 from '~/assets/img/error-page/500.svg'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    width: '1250px',
    height: '436px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundImage: `url(${backGround500})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right'
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
    marginBottom: '40px'
  },
  homeBtn: {
    width: '194px',
    height: '56px',
    backgroundColor: 'primary.900',
    borderRaidus: '4px',
    boxShadow: mainShadow
  }
}
