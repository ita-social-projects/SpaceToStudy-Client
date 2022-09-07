import { useTheme, useMediaQuery } from '@mui/material'

const useBreakpoints = () => {
  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'), { noSsr: true })
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'), { noSsr: true })

  return { isDesktop, isTablet, isMobile }
}

export default useBreakpoints
