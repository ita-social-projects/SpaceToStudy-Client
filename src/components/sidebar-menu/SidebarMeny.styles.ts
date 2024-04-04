import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  sidebarButton: {
    width: '30%',
    pr: { lg: '96px' },
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
