import { TypographyVariantEnum } from '~/types'

export const styles = {
  calendarContainer: {
    width: { xs: '87%', sm: '380px', md: '561px' },
    height: { xs: '257px', sm: '290px', md: '444px' },
    m: { xs: '87px auto 0px', md: '87px 0px 0px' },
    backgroundColor: 'basic.white',
    border: '1px solid basic.lightBlue',
    borderRadius: '36px',
    p: { xs: '12px', sm: '12px 24px' },
    '.MuiCalendarPicker-root': {
      width: '100%',
      height: '526px',
      maxHeight: '526px'
    },
    '.MuiDayPicker-header': {
      display: 'none'
    },
    '.MuiDayPicker-weekContainer': {
      justifyContent: 'space-between',
      alignItems: 'center',
      height: { xs: '35px', sm: '40px', md: '72px' }
    },
    '.MuiDayPicker-slideTransition': {
      overflow: 'visible'
    },
    '.MuiPickersCalendarHeader-root': {
      display: 'none'
    },
    '.MuiPickersArrowSwitcher-spacer': {
      display: 'none'
    }
  },

  day: {
    typography: {
      xs: TypographyVariantEnum.Button,
      md: TypographyVariantEnum.H6
    },
    borderRadius: { xs: '12px', sm: '16px', md: '22.5px' },
    width: { md: '74px' },
    height: { md: '60px' },
    p: { xs: '0px', sm: '20px 25px', md: '18px 30px' },
    color: 'basic.lightBlue',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'basic.white',
      backgroundColor: 'basic.lightBlue'
    },
    '&.MuiPickersDay-dayOutsideMonth': {
      color: 'basic.bismark'
    }
  },

  mainWrapper: {
    position: 'relative'
  },

  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 2,
    left: '50%',
    transform: 'translateX(-50%)',
    gap: '3px'
  },

  dots: {
    width: { xs: '4px', sm: '4px', md: '5px' },
    height: { xs: '4px', sm: '4px', md: '5px' },
    borderRadius: '50%',
    backgroundColor: 'basic.lightBlue'
  },

  iconButton: {
    color: 'basic.lightBlue',
    ml: 'auto'
  },

  icon: {
    width: { xs: '18px', sm: '25px', md: '32px' },
    height: { xs: '18px', sm: '25px', md: '32px' }
  },

  calendarHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    mt: '16px',
    mb: '8px',
    pl: { xs: '10px', sm: '17px', md: '24px' },
    pr: { xs: '5px', sm: '10px', md: '12px' }
  },

  currentMonth: {
    typography: {
      xs: TypographyVariantEnum.Button,
      sm: TypographyVariantEnum.MidTitle,
      md: TypographyVariantEnum.H6
    },
    color: 'basic.lightBlue',
    textTransform: { xs: 'capitalize' }
  },

  arrows: {
    color: 'basic.lightBlue',
    '& svg': {
      width: { xs: '20px', sm: '26px', md: '36px' },
      height: { xs: '20px', sm: '26px', md: '36px' }
    }
  }
}
