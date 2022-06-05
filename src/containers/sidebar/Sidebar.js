import { Drawer, Typography, IconButton, List, ListItem, Link } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import style from '~/containers/sidebar/sidebar.style'

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
        <CloseIcon color='primary' />
      </IconButton>

      <List sx={ style.list }>
        { navigationList }
      </List>
    </Drawer>
  )
}

export default Sidebar
