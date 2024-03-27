import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    backgroundColor: 'basic.white',
    padding: '20px',
    borderRadius: '5px'
  },
  title: {
    typography: TypographyVariantEnum.H5
  },
  subtitle: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'basic.gray'
  },
  optionsContainer: {
    padding: '30px',
    pr: '50px'
  },
  options: {
    border: '1px solid ',
    borderColor: 'basic.gray',
    borderRadius: '5px',
    padding: '15px',
    mt: '-1px'
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
