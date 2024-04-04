import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  sidebarButton: {
    width: '30%',
    pt: '0px',
    '& .MuiListItem-root': {
      pl: '0px',
      '&:first-of-type': {
        pt: '0px'
      },
      '&:not(:first-of-type)': {
        pt: '18px'
      }
    },
    '& .MuiListItemButton-root div': {
      minWidth: '34px'
    },
    '& .MuiButtonBase-root:hover': {
      backgroundColor: palette.basic.grey,
      '& .MuiTypography-body1': {
        color: palette.basic.black,
        fontWeight: '600'
      },
      '& .MuiListItemIcon-root svg': {
        color: palette.basic.black
      }
    }
  }
}
