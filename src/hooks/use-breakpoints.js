import { useTheme, useMediaQuery } from '@mui/material'

const useBreakpoints = () => {
  let size
  const theme = useTheme()

  if (useMediaQuery(theme.breakpoints.only('xl'))) {
    size = 'xl'
  }
  if (useMediaQuery(theme.breakpoints.only('lg'))) {
    size = 'lg'
  }
  if (useMediaQuery(theme.breakpoints.only('md'))) {
    size = 'md'
  }
  if (useMediaQuery(theme.breakpoints.only('sm'))) {
    size = 'sm'
  }
  if (useMediaQuery(theme.breakpoints.only('xs'))) {
    size = 'xs'
  }

  return size
}

export default useBreakpoints
