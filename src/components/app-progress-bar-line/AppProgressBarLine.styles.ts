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
  progress: (progress: number) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '10px',
    backgroundColor: 'primary.100',
    borderRadius: '5px',
    ['& .MuiLinearProgress-bar1Determinate']: {
      borderRadius: '5px',
      background: `linear-gradient(90deg,
      ${palette.basic.carmenRed} ${100 - progress}%,
      ${palette.basic.burntOrange} ${125 - progress}%,
      ${palette.basic.yellowBrown} ${150 - progress}%,
      ${palette.basic.yellowGreen} ${175 - progress}%,
      ${palette.basic.fruitSalad} ${200 - progress}%)`
    }
  })
}
