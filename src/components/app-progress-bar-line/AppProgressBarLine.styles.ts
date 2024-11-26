import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  wrapperProgress: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'row-reverse', sm: 'column' },
    alignItems: { xs: 'center' },
    mt: { xs: '8px', sm: '40px' }
  },
  labels: {
    width: { xs: 'auto', sm: '100%' },
    display: 'flex',
    justifyContent: 'space-between',
    mb: { xs: '0', sm: '10px' },
    ml: { xs: '20px', sm: '0' }
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
  }),
  progressCoop: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '12px',
    backgroundColor: `${palette.basic.turquoise100}`,
    borderRadius: '5px',
    '& .MuiLinearProgress-bar': {
      borderRadius: '5px',
      background: `${palette.basic.turquoise500}`
    }
  },
  wrapperProgressCoop: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'row-reverse', sm: 'column' },
    alignItems: 'center',
    mb: { xs: '2px', sm: '24px' }
  },
  labelsCoop: {
    width: { xs: 'auto', sm: '100%' },
    display: 'flex',
    justifyContent: 'space-between',
    mb: '0',
    ml: { xs: '20px', sm: '0' }
  },
  wrapperTypographyProgressCoop: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  accessTimeIcon: {
    color: 'primary.500',
    mr: '8px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'flex-end'
  },
  primaryLabelsCoop: {
    color: 'primary.500',
    fontSize: '12px'
  },
  completedLabel: {
    color: `${palette.basic.turquoise700}`,
    fontSize: '20px'
  },
  wrapperTitleWithIconCoop: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapperMainLabelForCoop: {
    width: '100%'
  }
}
