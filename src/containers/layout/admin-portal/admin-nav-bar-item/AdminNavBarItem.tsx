import { ReactNode, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { styles } from './AdminNavBarItem.styles'

interface AdminNavBarItemProps {
  label: string
  icon: ReactNode
  expanded: boolean
  children: { subLabel: string; path: string }[]
  path?: string
  active: boolean
  showSubItems: boolean
  handleShowSubItems: (label: string) => void
  handleActive: () => void
}

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
}: AdminNavBarItemProps) => {
  const [activeSubItem, setActiveSubItem] = useState<number | null>(null)

  const { t } = useTranslation()

  const clickListItem = () => {
    !active && setActiveSubItem(null)
    handleActive()
    handleShowSubItems(label)
  }

  const expandIcon = showSubItems ? <ExpandLess /> : <ExpandMore />

  const subItems = useMemo(
    () =>
      children.map(({ subLabel, path }, index) => (
        <Collapse in={showSubItems} key={subLabel}>
          <List component='ul' disablePadding>
            <ListItemButton
              component={Link}
              onClick={() => setActiveSubItem(index)}
              sx={styles.subItem}
              to={path}
            >
              <ListItemText
                primary={t(`admin.navBar.${subLabel}`)}
                primaryTypographyProps={{
                  sx: [activeSubItem === index && styles.activeSubItem]
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      )),
    [activeSubItem, children, showSubItems, t]
  )

  return (
    <>
      <Box sx={[styles.wrapper, expanded && styles.stableWidth]}>
        <ListItemButton
          component={children.length ? ListItemButton : Link}
          key={label}
          onClick={clickListItem}
          selected={active}
          to={path}
        >
          <ListItemIcon sx={styles.icon}>{icon}</ListItemIcon>
          {expanded && (
            <>
              <ListItemText
                primary={t(`admin.navBar.${label}`).toUpperCase()}
                sx={styles.label}
              />
              {!!children.length && expandIcon}
            </>
          )}
        </ListItemButton>
        {active && <Box sx={styles.active} />}
      </Box>
      {children && subItems}
    </>
  )
}

export default AdminNavBarItem
