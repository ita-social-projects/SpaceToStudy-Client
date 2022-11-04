import { useState } from 'react'
import { Link } from 'react-router-dom'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styles } from './AdminNavBarItem.styles'

const AdminNavBarItem = ({ label, icon, expanded, childrens, path }) => {
  const [showSubItems, setShowSubItems] = useState(false)

  const expandSubItems = () => {
    setShowSubItems((prev) => !prev)
  }

  return (
    <>
      <ListItemButton
        component={ Link }
        key={ label }
        onClick={ expandSubItems }
        sx={ [styles.listItem, expanded && styles.stableWidth] }
        to={ !childrens.length && path }
      >
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        { expanded && (
          <>
            <ListItemText primary={ label } sx={ styles.label } />
            { !!childrens.length && (showSubItems ? <ExpandLess /> : <ExpandMore />) }
          </>
        ) }
      </ListItemButton>
      { childrens &&
        childrens.map(({ subLabel, path }) => (
          <Collapse in={ showSubItems } key={ subLabel }>
            <List component='ul' disablePadding>
              <ListItemButton component={ Link } sx={ styles.subItem } to={ path }>
                <ListItemText primary={ subLabel } />
              </ListItemButton>
            </List>
          </Collapse>
        )) }
    </>
  )
}

export default AdminNavBarItem
