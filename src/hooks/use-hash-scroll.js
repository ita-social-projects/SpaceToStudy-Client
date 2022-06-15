import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const useHashScroll = () => {
  let { hash } = useLocation()

  const scrollToAnchor = useCallback((elementWithId) => {
    if (hash.includes('#')) {
      const elementWithId = document.getElementById(hash.replace('#', ''))
      elementWithId && elementWithId.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash]) 
  
  useEffect(() => {
    scrollToAnchor()
  }, [scrollToAnchor])

  return { scrollToAnchor }
}

export default useHashScroll
