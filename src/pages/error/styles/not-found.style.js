import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    margin: { xs: '0 16px', sm: '0 60px' },
    height: '90vh'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', md: 'flex-start' },
    position: { sm: 'inherit', md: 'absolute' },
    top: '40%',
    left: '50%',
    m: '0 auto',
    maxWidth: '430px',
    zIndex: 2,
    '& p': {
      textAlign: { md: 'left', sm: 'center' },
      fontWeight: 400
    }
  },
  button: {
    padding: '16px 48px',
    backgroundColor: 'primary.900',
    boxShadow: mainShadow
  },
  imgBox: {
    display: 'flex',
    justifyContent: 'space-between',
    position: { sm: 'static', md: 'relative' },
    width: '100%',
    maxHeight: { sm: '50vh', md: '90vh' },
    overflow: 'auto',
    maxWidth: 'lg'
  },
  manImg: {
    maxWidth: { xs: '340px', md: '520px' },
    overflow: 'auto'
  },
  plantImg: {
    alignSelf: 'end',
    maxWidth: { xs: '110px', md: '170px' },
    overflow: 'auto'
  }
}
