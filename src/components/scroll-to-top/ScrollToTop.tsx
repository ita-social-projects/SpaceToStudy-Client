import { FC, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface ScrollToTopProps {
  element: React.RefObject<HTMLDivElement>
}

const ScrollToTop: FC<ScrollToTopProps> = ({ element }) => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    element.current?.scrollTo(0, 0)
  }, [element, pathname])

  return null
}

export default ScrollToTop
