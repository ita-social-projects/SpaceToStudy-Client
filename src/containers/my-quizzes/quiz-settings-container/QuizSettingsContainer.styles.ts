import { TypographyVariantEnum } from '~/types'
export const styles = {
  topTitle: {
    mt: '8px'
  },
  title: {
    typography: TypographyVariantEnum.H6,
    color: 'basic.blueGray',
    mt: '40px'
  },
  select: {
    width: '160px',
    height: '40px',
    flex: 'none'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: '32px'
  },
  switch: {
    width: '50px',
    height: '24px',
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: '4px',
      '&.Mui-checked': {
        transform: 'translateX(26px)',
        color: 'basic.white',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: 'basic.white'
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: 'primary.900'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      width: '16px',
      height: '16px',
      backgroundColor: 'basic.gray'
    },
    '& .MuiSwitch-track': {
      borderRadius: '28px',
      opacity: 1,
      border: '2px solid',
      borderColor: 'primary.100',
      backgroundColor: 'basic.white',
      boxSizing: 'border-box'
    }
  }
}
