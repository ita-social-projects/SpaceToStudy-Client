import palette from '~/styles/app-theme/app.pallete'
import { SlideLeftLongAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: (isView: boolean) => ({
    p: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    ml: isView ? '15px' : '38px'
  }),
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
    alignItems: 'center',
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
    gap: '1rem',
    alignItems: 'center'
  },
  editBtn: {
    color: palette.basic.blueGray
  },
  linkBtn: {
    color: palette.basic.blueGray,
    transform: 'rotate(315deg)'
  }
}
