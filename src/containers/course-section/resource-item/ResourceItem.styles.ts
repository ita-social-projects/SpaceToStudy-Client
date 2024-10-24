import palette from '~/styles/app-theme/app.pallete'
import { SlideLeftLongAnimation } from '~/styles/app-theme/custom-animations'
import { ResourceAvailabilityStatusEnum, TypographyVariantEnum } from '~/types'

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
    justifyContent: 'center'
  },
  availabilitySectionIcon: {
    display: 'flex',
    alignItems: 'center'
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
  },
  availabilityStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textTransform: 'capitalize',
    color: {
      [ResourceAvailabilityStatusEnum.Open]: palette.success[800],
      [ResourceAvailabilityStatusEnum.OpenFrom]: palette.basic.yellowDark,
      [ResourceAvailabilityStatusEnum.Closed]: palette.error[300]
    },
    background: {
      [ResourceAvailabilityStatusEnum.Open]: palette.success[50],
      [ResourceAvailabilityStatusEnum.OpenFrom]: palette.warning[50],
      [ResourceAvailabilityStatusEnum.Closed]: palette.error[50]
    },
    borderRadius: '9999px',
    px: '12px',
    py: '8px',
    fontSize: '14px',
    icon: {
      width: '16px',
      height: '16px'
    }
  },
  titleWithDescriptionWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  titleWithDescription: {
    title: {
      textTransform: 'capitalize',
      typography: TypographyVariantEnum.Caption,
      color: 'primary.500'
    },
    description: {
      color: palette.basic.lightBlue,
      typography: TypographyVariantEnum.Subtitle2
    }
  }
}
