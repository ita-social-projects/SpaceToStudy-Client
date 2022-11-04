import { useState } from 'react'

import AdminNavBarItem from '../admin-nav-bar-item/AdminNavBarItem'

import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { styles } from './AdminNavBar.styles'

import { navBarItems } from './constants'

const AdminNavBar = () => {
  const [expanded, setExpanded] = useState(false)

  const openNavBar = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <List sx={ [styles.navBar, expanded && styles.expanded] }>
      <ListItemButton onClick={ openNavBar } sx={ [styles.listItem, styles.openButton] }>
        <ListItemIcon sx={ styles.openButton }>
          { expanded ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon /> }
        </ListItemIcon>
      </ListItemButton>
      <Divider sx={ styles.divider } />
      { navBarItems.map((item) => (
        <AdminNavBarItem expanded={ expanded } key={ item.label } { ...item } />
      )) }
    </List>
  )
}

export default AdminNavBar
