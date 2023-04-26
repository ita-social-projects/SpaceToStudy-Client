import { smallHoverShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    maxWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    pt: '24px'
  },
  slider: {
    maxWidth: '220px',
    alignSelf: 'center',
    color: 'primary.700',
    '& .MuiSlider-rail': {
      backgroundColor: 'primary.100'
    },
    '& .MuiSlider-thumb': {
      height: '10px',
      width: '10px',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: smallHoverShadow
      }
    },
    '& .MuiSlider-markLabel': {
      top: '-20px',
      typography: 'caption',
      color: 'primary.700'
    },
    '& .MuiSlider-mark': {
      height: '10px',
      width: '10px',
      ml: '-4px',
      borderRadius: '5px',
      color: 'primary.100'
    }
  },
  inputBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      padding: '7px',
      fontSize: '14px'
    }
  },
  inactiveStyle: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'primary.100'
      }
    },
    '& input': { color: 'primary.500' }
  },
  inputContainer: { maxWidth: '60px' },
  inputTitle: { color: 'primary.600' },
  priceInputs: {
    display: 'flex',
    gap: '24px'
  }
}
