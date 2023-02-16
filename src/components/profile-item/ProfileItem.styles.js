export const styles = {
  wrapper: {
    padding: { xs: '10px 14px', sm: '20px 35px' },
    borderRadius: '8px',
    color: 'primary.500',
    backgroundColor: 'white',
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
      color: 'primary.500'
    }
  },
  text: {
    margin: { xs: '0', sm: '0 35px 0 28px' }
  },

  checkIcon: {
    color: 'basic.orientalHerbs',
    position: 'absolute',
    right: { xs: '14px', sm: '35px' },
    top: { xs: '10px', sm: '50%' },
    zIndex: 1,
    transform: { sm: 'translateY(-50%)' }
  }
}
