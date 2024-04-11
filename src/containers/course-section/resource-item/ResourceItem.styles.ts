import { SlideLeftLongAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    p: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    ml: '38px'
  },
  availabilitySelectionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: '16px'
  },
  availabilityIcon: {
    p: '8px'
  },
  availabilitySelect: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  },
  datePicker: {
    display: 'flex',
    ...SlideLeftLongAnimation,
    '& .MuiTextField-root': {
      fontSize: '14px',
      width: '180px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      fontSize: '14px'
    }
  },
  resourceActions: {
    display: 'flex',
    gap: '1rem'
  }
}
