import useMediaQuery from '@mui/material/useMediaQuery'

const useBreakpointsGoogle = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)', { noSsr: true })
  const isMediumScreen = useMediaQuery(
    '(min-width:601px) and (max-width:900px)',
    { noSsr: true }
  )
  const isLargeScreen = useMediaQuery(
    '(min-width:901px) and (max-width:1200px)',
    { noSsr: true }
  )
  const isXLargeScreen = useMediaQuery('(min-width:1201px)', { noSsr: true })

  return { isSmallScreen, isMediumScreen, isLargeScreen, isXLargeScreen }
}

export default useBreakpointsGoogle
