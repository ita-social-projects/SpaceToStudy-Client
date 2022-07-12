import { useTheme, useMediaQuery } from '@mui/material'

const useBreakpoints = () => {
  const theme = useTheme()

  const sizes = {
    desktop: useMediaQuery(theme.breakpoints.up('md'), { noSsr: true }),
    tablet: useMediaQuery(theme.breakpoints.between('sm', 'md'), { noSsr: true }),
    mobile: useMediaQuery(theme.breakpoints.between('xs', 'sm'), { noSsr: true })
  }

  if (sizes.desktop) {
    return 'desktop'
  } else if (sizes.tablet) {
    return 'tablet'
  } else if (sizes.mobile) {
    return 'mobile'
  }
}

export default useBreakpoints
