import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ element }) => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    element.current?.scrollTo(0, 0)
  }, [element, pathname])

  return null
}

export default ScrollToTop
