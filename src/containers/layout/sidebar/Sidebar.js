import { useTranslation } from 'react-i18next'

import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import CloseIcon from '@mui/icons-material/Close'

import HashLink from '~/components/hash-link/HashLink'

import { style } from '~/containers/layout/sidebar/Sidebar.styles'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, navigationItems }) => {
  const { t } = useTranslation()

  const navigationList = navigationItems.map((item) => {
    return (
      <ListItem key={ item.label }>
        <Typography
          component={ HashLink }
          onClick={ () => setIsSidebarOpen(false) }
          sx={ style.listItem }
          to={ item.path }
          variant='subtitle1'
        >
          { t(`header.${item.label}`) }
        </Typography>
      </ListItem>
    )
  })

  return (
    <Drawer anchor='right' onClose={ () => setIsSidebarOpen(false) } open={ isSidebarOpen }>
      <IconButton onClick={ () => setIsSidebarOpen(false) } sx={ style.closeIcon }>
        <CloseIcon color='primary' />
      </IconButton>

      <List sx={ style.list }>
        { navigationList }
      </List>
    </Drawer>
  )
}

export default Sidebar
