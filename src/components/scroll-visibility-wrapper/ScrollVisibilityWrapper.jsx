import { useEffect, useState } from 'react'

const ScrollVisibilityWrapper = ({ pageRef, children, heightToShow }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const scrollVariable = pageRef?.current

    if (scrollVariable) {
      const scroll = () =>
        scrollVariable.scrollTop > heightToShow
          ? setIsVisible(true)
          : setIsVisible(false)

      scrollVariable.addEventListener('scroll', scroll)

      return () => scrollVariable.removeEventListener('scroll', scroll)
    }
  }, [pageRef, heightToShow])

  return isVisible ? children : null
}

export default ScrollVisibilityWrapper
