import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  wrapperProgress: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'row-reverse', sm: 'column' },
    alignItems: { xs: 'center' },
    marginTop: { xs: '8px', sm: '40px' }
  },
  labels: {
    width: { xs: 'auto', sm: '100%' },
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: { xs: '0', sm: '10px' },
    marginLeft: { xs: '20px', sm: '0' }
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '10px',
    background: palette.primary[100],
    borderRadius: '5px'
  },
  fillInPercent: {
    height: 'inherit',
    borderRadius: 'inherit',
    overflow: 'hidden'
  },
  scale: {
    height: 'inherit',
    background: 'linear-gradient(90deg, #B91F1B 0%, #F56F36 20%, #F5D636 40%, #9BC541 80%, #4CAF50 100%)'
  }
}
