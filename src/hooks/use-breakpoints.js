import { useTheme, useMediaQuery } from '@mui/material'

const useBreakpoints = () => {
  let size
  const theme = useTheme()

  if (useMediaQuery(theme.breakpoints.up('md'))) {
    size = 'md'
  }
  if (useMediaQuery(theme.breakpoints.between('sm', 'md'))) {
    size = 'sm'
  }
  if (useMediaQuery(theme.breakpoints.between('xs', 'sm'))) {
    size = 'xs'
  }

  return size
}

export default useBreakpoints
