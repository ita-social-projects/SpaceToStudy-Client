import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { styles } from '~/components/scroll-to-top-button/ScrollToTopButton.styles'
import ScrollVisibilityWrapper from '~/components/scroll-visibility-wrapper/ScrollVisibilityWrapper'

const ScrollToTopButton = ({ element }) => {
  const goToTop = () => {
    element.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <ScrollVisibilityWrapper heightToShow={450} pageRef={element}>
      <Box sx={styles.root}>
        <IconButton onClick={goToTop} sx={styles.button}>
          <ArrowUpwardRoundedIcon sx={styles.icon} />
        </IconButton>
      </Box>
    </ScrollVisibilityWrapper>
  )
}

export default ScrollToTopButton
