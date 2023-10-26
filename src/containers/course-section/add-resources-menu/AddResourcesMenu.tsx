import { FC } from 'react'

import MenuItem from '@mui/material/MenuItem'
import AppMenu from '~/components/app-menu/AppMenu'
import { AddResourcesMenuItem } from '~/containers/course-section/CourseSectionContainer.constants'

import { styles } from '~/containers/course-section/add-resources-menu/AddResourcesMenu.styles'

interface AddResourcesMenuProps {
  anchorEl: Element | null
  onClose: () => void
  menuListValues: Array<AddResourcesMenuItem>
}

const AddResourcesMenu: FC<AddResourcesMenuProps> = ({
  anchorEl,
  menuListValues,
  onClose
}) => {
  const menuList = menuListValues.map((item) => (
    <MenuItem key={item.name} onClick={item.handleClick} sx={styles.menuItem}>
      {item.name}
    </MenuItem>
  ))

  return (
    <AppMenu
      anchorEl={anchorEl}
      menuList={menuList}
      onClose={onClose}
      open={Boolean(anchorEl)}
    />
  )
}

export default AddResourcesMenu
