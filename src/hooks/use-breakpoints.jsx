import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const useBreakpoints = () => {
  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true })
  const isLaptopAndAbove = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true
  })
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'), {
    noSsr: true
  })
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'), {
    noSsr: true
  })
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'), {
    noSsr: true
  })

  return { isDesktop, isLaptopAndAbove, isLaptop, isTablet, isMobile }
}

export default useBreakpoints
