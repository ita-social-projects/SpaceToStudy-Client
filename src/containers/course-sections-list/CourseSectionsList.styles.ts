import palette from '~/styles/app-theme/app.pallete'
import { fadeAnimation } from '~/styles/app-theme/custom-animations'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  section: (isDragging: boolean) => ({
    mb: '20px',
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    ...(isDragging && {
      boxShadow: `0px 3px 16px 2px ${palette.primary[300]}`,
      border: `2px solid ${palette.primary[300]}`
    })
  }),
  dragIconWrapper: {
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  dragIcon: {
    fontSize: '30px',
    transform: 'rotate(90deg)',
    color: 'primary.400',
    cursor: 'pointer'
  },
  activityButton: {
    typography: TypographyVariantEnum.Body2,
    color: 'basic.blueGray',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 7px'
  },
  activityButtonIcon: {
    marginLeft: '8px',
    width: '16px',
    height: '16px'
  },
  activityButtonContainerDefault: {
    height: '24px',
    transition: 'height 0.3s cubic-bezier(0, 0, 0.2, 1)',
    '& .MuiDivider-root': {
      display: 'none'
    },
    '&:hover': {
      height: '40px',
      transition: 'height 0.3s cubic-bezier(0, 0, 0.2, 1)',
      '& .MuiDivider-root': {
        display: 'flex',
        ...fadeAnimation,
        '&:after, &:before': {
          borderColor: palette.basic.lightGray
        }
      }
    }
  },
  activityButtonContainerVisible: {
    height: '40px',
    '& .MuiDivider-root': {
      '&:after, &:before': {
        borderColor: palette.basic.lightGray
      }
    }
  },
  menuRoot: {
    '& .MuiPaper-root': {
      marginTop: '12px',
      '& .MuiMenuItem-root': {
        padding: '12px 16px',
        typography: TypographyVariantEnum.Body2,
        color: 'basic.darkGray',
        fontWeight: 500
      }
    }
  },
  menuIcon: {
    marginRight: '8px',
    width: '16px',
    height: '16px'
  }
}
