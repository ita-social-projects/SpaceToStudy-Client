import { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import { styles } from '~/components/scroll-to-top-button/ScrollToTopButton.styles'


const ScrollToTopButton = ({ element }) => {
  const [isVisible, setIsVisible] = useState(false)
 

   useEffect(() => {
    const scrollVariable = element.current
    const scroll = () => (scrollVariable.scrollTop > 450 ? setIsVisible(true) : setIsVisible(false))
    scrollVariable.addEventListener('scroll', scroll)
    return () => scrollVariable.removeEventListener('scroll', scroll)
  }, [element])

  const goToTop = () => {
    element.current.scrollTo({
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

export default ScrollToTopButton
