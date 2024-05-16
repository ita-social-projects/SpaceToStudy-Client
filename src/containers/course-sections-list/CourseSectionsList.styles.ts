import palette from '~/styles/app-theme/app.pallete'
import { fadeAnimation } from '~/styles/app-theme/custom-animations'
import { PositionEnum, TypographyVariantEnum } from '~/types'

const iconSize = {
  width: '16px',
  height: '16px'
}
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
    color: 'primary.400'
  },
  activityButton: {
    typography: TypographyVariantEnum.Body2,
    color: 'basic.blueGray',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    m: '0 7px'
  },
  activityButtonIcon: {
    ml: '8px',
    ...iconSize
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
      mt: '12px',
      '& .MuiMenuItem-root': {
        p: '12px 16px',
        typography: TypographyVariantEnum.Body2,
        color: 'basic.darkGray',
        fontWeight: 500
      }
    },
    transformOrigin: {
      vertical: PositionEnum.Top,
      horizontal: PositionEnum.Center
    },
    anchorOrigin: {
      vertical: PositionEnum.Bottom,
      horizontal: PositionEnum.Center
    }
  },
  menuIcon: {
    mr: '8px',
    ...iconSize
  }
}
