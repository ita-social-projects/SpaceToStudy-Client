import { FC, useCallback, useState } from 'react'
import { Menu as MuiMenu, PopoverOrigin } from '@mui/material'

import {
  MenuItemProps as CommonMenuItemProps,
  OnItemClickArgs
} from '~scss-components/menu-item/menu-item.types'
import MenuItem from '../menu-item/MenuItem'

import '~scss-components/menu/Menu.scss'

interface NestedMenuItemProps extends CommonMenuItemProps {
  defaultOnItemClickArgs?: OnItemClickArgs
}

interface MenuItemProps extends NestedMenuItemProps {
  additionalInfo?: string
  nestedMenuItems?: NestedMenuItemProps[]
}

interface MenuProps {
  anchorEl: HTMLElement | null
  setAnchorEl: (anchorEl: HTMLElement | null) => void
  menuItems: MenuItemProps[]
  anchorOrigin?: PopoverOrigin
  density?: 1 | 2
  defaultOnItemClick?: (args: OnItemClickArgs) => void
  transformOrigin?: PopoverOrigin
  slotProps?: { paper: { style: { maxHeight: number } } }
}

const Menu: FC<MenuProps> = ({
  anchorEl,
  setAnchorEl,
  menuItems,
  defaultOnItemClick,
  density = 1,
  ...menuProps
}: MenuProps) => {
  const [toggledItem, setToggledItem] = useState<string | null>(null)

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleItemClick = useCallback(
    ({
      title,
      defaultOnItemClickArgs,
      onClick: customOnClick
    }: MenuItemProps) => {
      if (!customOnClick && !defaultOnItemClick) {
        setToggledItem((previousTitle) =>
          previousTitle === title ? null : title
        )
        return
      }

      if (customOnClick) {
        customOnClick()
        handleMenuClose()
      } else if (defaultOnItemClick) {
        const args: OnItemClickArgs =
          defaultOnItemClickArgs === undefined
            ? { title }
            : { title, ...defaultOnItemClickArgs }

        defaultOnItemClick(args)
      }

      setToggledItem(null)
      handleMenuClose()
    },
    [defaultOnItemClick, handleMenuClose]
  )

  return (
    <MuiMenu
      anchorEl={anchorEl}
      className={`s2s-menu s2s-menu--density-${density}`}
      onClose={handleMenuClose}
      open={Boolean(anchorEl)}
      {...menuProps}
    >
      {menuItems.flatMap((item) => [
        <MenuItem
          {...item}
          density={density}
          isDropdown={Boolean(item.nestedMenuItems)}
          isToggled={toggledItem === item.title}
          key={item.title}
          onClick={() => handleItemClick(item)}
        />,
        ...(item.nestedMenuItems && toggledItem === item.title
          ? item.nestedMenuItems.map((nestedMenuItem) => (
              <MenuItem
                {...nestedMenuItem}
                density={1}
                key={nestedMenuItem.title}
                onClick={() => handleItemClick(nestedMenuItem)}
                variant='nested'
              />
            ))
          : [])
      ])}
    </MuiMenu>
  )
}

export default Menu
