import { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'

import { style } from '~/components/scroll-to-top/ScrollToTop.styles'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scroll = () => (window.scrollY > 450 ? setIsVisible(true) : setIsVisible(false))

  useEffect(() => {
    window.addEventListener('scroll', scroll)
    return () => window.removeEventListener('scroll', scroll)
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    isVisible && (
      <Box sx={ style.root }>
        <IconButton onClick={ goToTop } sx={ style.button }>
          <ArrowUpwardRoundedIcon sx={ style.icon } />
        </IconButton>
      </Box>
    )
  )
}

export default ScrollToTop
