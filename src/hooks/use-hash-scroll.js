import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const useHashScroll = () => {
  let { hash } = useLocation()

  const scrollToAnchor = useCallback(() => {
    if (hash.includes('#')) {
      const elementWithId = document.getElementById(hash.replace('#', ''))
      elementWithId.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash]) 
  
  useEffect(() => {
    scrollToAnchor()
  }, [scrollToAnchor])
}

export default useHashScroll
