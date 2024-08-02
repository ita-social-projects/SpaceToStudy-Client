import palette from '~/styles/app-theme/app.pallete'

const activeTabButtonStyles = {
  backgroundColor: palette.basic.grey,
  '& .MuiTypography-body1': {
    color: palette.basic.black,
    fontWeight: '600'
  },
  '& .MuiListItemIcon-root svg': {
    color: palette.basic.black
  }
}

export const styles = {
  tabButton: (isTabActive: boolean) => {
    return {
      color: palette.primary[500],
      svg: { color: palette.primary[500] },
      '&:hover': activeTabButtonStyles,
      ...(isTabActive && activeTabButtonStyles)
    }
  },
  tabList: {
    width: '30%',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    pt: 0,
    '& > li': {
      p: '0px'
    },
    '& .MuiListItemButton-root': {
      display: 'flex',
      gap: '10px',
      '& .MuiListItemIcon-root': {
        minWidth: 'unset'
      }
    }
  },
  listItemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.25
  },
  errorIcon: {
    color: `${palette.error[800]} !important`,
    fontSize: '1.25rem'
  }
}
