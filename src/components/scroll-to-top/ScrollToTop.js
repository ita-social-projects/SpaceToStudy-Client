import { useState, useEffect } from 'react'
import { IconButton, Box } from '@mui/material'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'

import { style } from '~/components/scroll-to-top/scroll-to-top.style'


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  const scroll = () => (window.scrollY > 450) ? setIsVisible(true) : setIsVisible(false)
 
  useEffect(() => {
    window.addEventListener('scroll', scroll)
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (isVisible && (
    <Box sx={ style.root }>
      <IconButton onClick={ goToTop } sx={ style.button }>
        <ArrowUpwardRoundedIcon sx={ style.icon } />
      </IconButton>
    </Box>

  ))
}

export default ScrollToTop
