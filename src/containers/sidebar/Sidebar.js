import { Box, Drawer, Typography, IconButton, List, ListItem, Link } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

const style = {
  closeIcon: {
    display: 'flex',
    justifyContent: 'end',
    margin: '10px 10px 10px 260px'
  },
  list: {
    p: 0
  },
  listItem: {
    // display: 'inline-block',
    padding: '10px 8px',
    fontSize: '18px',
    color: 'primary.900',
    textDecoration: 'none'
  }
}

const Sidebar = ({ isOpen, setIsOpen, navigationItems }) => {
  const { t } = useTranslation()
  
  const closeSidebar = () => setIsOpen(false)  

  const navigationList = navigationItems.map(item => {
    return (
      <ListItem
        key={ item.label }
      >
        <Typography
          component={ Link } href={ item.route } 
          onClick={ closeSidebar }
          sx={ style.listItem }
          variant="subtitle1"
        >
            
          { t(`header.guestNavBar.${ item.label }`) }
        </Typography>
      </ListItem>)
  })
    
  return (
    <Drawer
      anchor='right'
      onClose={ closeSidebar }
      open={ isOpen }
    >
      <IconButton onClick={ closeSidebar } sx={ style.closeIcon } >
        <CloseIcon />
      </IconButton>
      <Box role='presentation' textAlign='start' width='311px'>
        <List sx={ style.list }>
          { navigationList }
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
