import { Box, IconButton } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'

import { style } from '~/components/icons-box/icons-box.style'

const IconsBox = ({ setIsSidebarOpen, child }) => {

  return(
    <Box sx={ style.iconBox }>
      <IconButton sx={ style.langIcon }>
        <LanguageIcon color='primary' />
      </IconButton>
      { child }
      <IconButton onClick={ () => setIsSidebarOpen(true) } sx={ style.menuIcon }>
        <MenuIcon color='primary' />
      </IconButton>
    </Box>
  )
}

export default IconsBox
