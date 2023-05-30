import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const menuList = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        boxShadow: mainShadow
      },
      '& .MuiMenu-list': {
        padding: 0
      }
    }
  }
}
