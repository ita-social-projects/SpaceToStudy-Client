import { useTheme, useMediaQuery } from '@mui/material'

const useBreakpoints = () => {
  const theme = useTheme()

  const sizes = {
    desktop: useMediaQuery(theme.breakpoints.up('md')),
    tablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    mobile: useMediaQuery(theme.breakpoints.between('xs', 'sm'))
  }

  if (sizes.desktop) {
    return 'desktop'
  } else if (sizes.tablet) {
    return 'tablet'
  } else {
    return 'mobile'
  }
}

export default useBreakpoints
