import { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'

import { style } from '~/components/scroll-to-top/scroll-to-top.style'


const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)
  
  const scroll = () => {
    if (window.scrollY > 450) {
      setShowTopBtn(true)
    } else {
      setShowTopBtn(false)
    }
  }
    
  useEffect(() => {
    window.addEventListener('scroll', scroll)
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (showTopBtn && (
    <IconButton onClick={ goToTop } sx={ style.button }>
      <ArrowCircleUpIcon sx={ style.icon } />
    </IconButton>

  ))
}

export default ScrollToTop
