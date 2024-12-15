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
  isItemsRemovalEnabled?: boolean
  noItemsMessage?: string
  maxHeight?: number
  minWidth?: number
  transformOrigin?: PopoverOrigin
}

const Menu: FC<MenuProps> = ({
  anchorEl,
  setAnchorEl,
  menuItems,
  defaultOnItemClick,
  maxHeight,
  minWidth,
  noItemsMessage,
  density = 1,
  isItemsRemovalEnabled = false,
  ...menuProps
}: MenuProps) => {
  const [items, setItems] = useState(menuItems)
  const [toggledItem, setToggledItem] = useState<string | null>(null)

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleItemClick = useCallback(
    ({
      title,
      defaultOnItemClickArgs,
      nestedMenuItems,
      onClick: customOnClick
    }: MenuItemProps) => {
      if ((!customOnClick && !defaultOnItemClick) || nestedMenuItems) {
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

  const handleItemRemoval = (title: string) => {
    setItems((previousItems) =>
      previousItems.filter((item) => item.title !== title)
    )
  }

  if (items.length < 1) {
    items.push({
      title: noItemsMessage ?? 'No items',
      isDisabled: true
    })
  }

  return (
    <MuiMenu
      anchorEl={anchorEl}
      className={`s2s-menu s2s-menu--density-${density}`}
      onClose={handleMenuClose}
      open={Boolean(anchorEl)}
      slotProps={{
        paper: {
          style: { maxHeight: maxHeight, minWidth: minWidth }
        }
      }}
      {...menuProps}
    >
      {items.flatMap((item) => [
        <MenuItem
          {...item}
          density={density}
          isDropdown={Boolean(item.nestedMenuItems)}
          isToggled={toggledItem === item.title}
          key={item.title}
          onClick={() => handleItemClick(item)}
          onRemove={
            isItemsRemovalEnabled
              ? () => handleItemRemoval(item.title)
              : undefined
          }
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
