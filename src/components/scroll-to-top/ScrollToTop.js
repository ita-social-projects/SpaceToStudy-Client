import { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'

import { styles } from '~/components/scroll-to-top/ScrollToTop.styles'

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
      <Box sx={ styles.root }>
        <IconButton onClick={ goToTop } sx={ styles.button }>
          <ArrowUpwardRoundedIcon sx={ styles.icon } />
        </IconButton>
      </Box>
    )
  )
}

export default ScrollToTop
