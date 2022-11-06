import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styles } from './AdminNavBarItem.styles'

const AdminNavBarItem = ({
  label,
  icon,
  expanded,
  children,
  path,
  active,
  showSubItems,
  handleShowSubItems,
  handleActive
}) => {
  const [activeSubItem, setActiveSubItem] = useState(null)

  const { t } = useTranslation()

  const clickListItem = () => {
    !active && setActiveSubItem(null)
    handleActive()
    handleShowSubItems(label)
  }

  const expandIcon = showSubItems ? <ExpandLess /> : <ExpandMore />

  const subItems = children.map(({ subLabel, path }, index) => (
    <Collapse in={ showSubItems } key={ subLabel }>
      <List component='ul' disablePadding>
        <ListItemButton
          component={ Link } onClick={ () => setActiveSubItem(index) } sx={ styles.subItem }
          to={ path }
        >
          <ListItemText
            primary={ t(`admin.navBar.${subLabel}`) }
            primaryTypographyProps={ { sx: [activeSubItem === index && styles.active] } }
          />
        </ListItemButton>
      </List>
    </Collapse>
  ))

  return (
    <>
      <ListItemButton
        component={ Link }
        key={ label }
        onClick={ clickListItem }
        selected={ active }
        sx={ [styles.listItem, expanded && styles.stableWidth] }
        to={ !children.length && path }
      >
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        { expanded && (
          <>
            <ListItemText primary={ t(`admin.navBar.${label}`).toUpperCase() } sx={ styles.label } />
            { !!children.length && expandIcon }
          </>
        ) }
      </ListItemButton>
      { children && subItems }
    </>
  )
}

export default AdminNavBarItem
