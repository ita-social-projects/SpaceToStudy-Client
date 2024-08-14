import { useCallback, useMemo, useState } from 'react'

import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { styles } from './AdminNavBar.styles'

import AdminNavBarItem from '../admin-nav-bar-item/AdminNavBarItem'

import { initialExpandSubItems, navBarItems } from './constants'

const AdminNavBar: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [active, setActive] = useState<number | null>(null)
  const [expandSubItems, setExpandSubItems] = useState<{
    [key: string]: boolean
  }>(initialExpandSubItems)

  const openNavBar = () => {
    if (expanded) {
      setExpandSubItems(initialExpandSubItems)
    }
    setExpanded((prev) => !prev)
  }

  const handleShowSubItems = useCallback(
    (label: string) => {
      const isExpandedItem = Object.hasOwn(initialExpandSubItems, label)
      if (!expanded && isExpandedItem) {
        setExpanded(true)
      }
      setExpandSubItems((prev) => ({
        ...initialExpandSubItems,
        [label]: !prev[label]
      }))
    },
    [expanded]
  )

  const expandIcon = expanded ? (
    <ArrowCircleLeftIcon />
  ) : (
    <ArrowCircleRightIcon />
  )

  const navBarList = useMemo(
    () =>
      navBarItems.map((item, index) => (
        <AdminNavBarItem
          active={active === index}
          expanded={expanded}
          handleActive={() => setActive(index)}
          handleShowSubItems={handleShowSubItems}
          key={item.label}
          showSubItems={expandSubItems[item.label]}
          {...item}
        />
      )),
    [active, expandSubItems, expanded, handleShowSubItems]
  )

  return (
    <List
      data-testid='AdminNavBar'
      sx={[styles.navBar, expanded && styles.expanded]}
    >
      <ListItemButton
        onClick={openNavBar}
        sx={[styles.listItem, styles.openButton]}
      >
        <ListItemIcon sx={styles.openButton}>{expandIcon}</ListItemIcon>
      </ListItemButton>
      <Divider sx={styles.divider} />
      {navBarList}
    </List>
  )
}

export default AdminNavBar
