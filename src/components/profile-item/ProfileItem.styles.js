import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  wrapper: {
    padding: { xs: '10px 14px', sm: '20px 35px' },
    borderRadius: '8px',
    color: palette.primary[500],
    backgroundColor: palette.basic.white,
    height: 'auto'
  },
  information: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    display: 'contents',
    svg: {
      width: '40px',
      height: '40px',
      color: palette.primary[500]
    }
  },
  text: {
    margin: { xs: '0', sm: '0 35px 0 28px' }
  },
  title: {
    fontSize: { xs: '12px', sm: '18px' },
    lineHeight: { xs: '18.2px', sm: '25.5px' }
  },
  subtitle: {
    fontWeight: '400',
    fontSize: { xs: '10px', sm: '14px' },
    lineHeight: { xs: '16.8px', sm: '20px' }
  },
  checkIcon: {
    color: '#12A03A',
    position: 'absolute',
    right: { xs: '14px', sm: '35px' },
    top: { xs: '10px', sm: '50%' },
    zIndex: 1,
    transform: { sm: 'translateY(-50%)' }
  }
}
