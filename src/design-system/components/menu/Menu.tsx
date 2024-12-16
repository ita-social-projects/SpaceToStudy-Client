import { FC, useCallback, useState } from 'react'
import { Menu as MuiMenu, PopoverOrigin } from '@mui/material'

import {
  MenuItemProps as CommonMenuItemProps,
  OnItemClickArgs
} from '~/design-system/components/menu-item/MenuItem.types'
import MenuItem from '../menu-item/MenuItem'
import {
  MenuItemColorVariant,
  MenuItemVariant
} from '../menu-item/MenuItem.constants'

import '~scss-components/menu/Menu.scss'

const removeAllItemsTitle = 'Clear all'
const defaultNoItemsMessage = 'No items.'

interface NestedMenuItemProps extends CommonMenuItemProps {
  defaultOnItemClickArgs?: OnItemClickArgs
  isInitiallyToggled?: boolean
}

interface MenuItemProps extends NestedMenuItemProps {
  additionalInfo?: string
  nestedMenuItems?: NestedMenuItemProps[]
}

interface MenuProps {
  anchorEl: HTMLElement | null
  setAnchorEl: (anchorEl: HTMLElement | null) => void
  menuItems: MenuItemProps[]
  allowToggleMultipleItems?: boolean
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
  allowToggleMultipleItems = false,
  isItemsRemovalEnabled = false,
  ...menuProps
}: MenuProps) => {
  const [items, setItems] = useState(menuItems)
  const [toggledItemsTitles, setToggledItemsTitles] = useState<string[]>(
    allowToggleMultipleItems
      ? menuItems
          .filter((item) => item.isInitiallyToggled)
          .map((item) => item.title)
      : []
  )

  const toggleAsSingleItem = (itemTitle: string) => {
    setToggledItemsTitles((previousItems) =>
      previousItems.includes(itemTitle) ? [] : [itemTitle]
    )
  }

  const toggleAsOneOfMultipleItems = (itemTitle: string) => {
    setToggledItemsTitles((previousItems) =>
      previousItems.includes(itemTitle)
        ? previousItems.filter((i) => i !== itemTitle)
        : [...previousItems, itemTitle]
    )
  }

  const handleMenuClose = useCallback(() => {
    setToggledItemsTitles([])
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleItemClick = useCallback(
    ({
      title,
      defaultOnItemClickArgs,
      nestedMenuItems,
      onClick: customOnClick
    }: MenuItemProps) => {
      allowToggleMultipleItems
        ? toggleAsOneOfMultipleItems(title)
        : toggleAsSingleItem(title)

      if ((!customOnClick && !defaultOnItemClick) || nestedMenuItems) {
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

      if (allowToggleMultipleItems) {
        return
      }

      handleMenuClose()
    },

    [defaultOnItemClick, handleMenuClose, allowToggleMultipleItems]
  )

  const handleItemRemoval = (title: string) => {
    setItems((previousItems) =>
      previousItems.filter((item) => item.title !== title)
    )
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
          isToggled={toggledItemsTitles.includes(item.title)}
          key={item.title}
          onClick={() => handleItemClick(item)}
          onRemove={
            isItemsRemovalEnabled
              ? () => handleItemRemoval(item.title)
              : undefined
          }
        />,
        ...(item.nestedMenuItems && toggledItemsTitles.includes(item.title)
          ? item.nestedMenuItems.map((nestedMenuItem) => (
              <MenuItem
                {...nestedMenuItem}
                density={1}
                key={nestedMenuItem.title}
                onClick={() => handleItemClick(nestedMenuItem)}
                variant={MenuItemVariant.Nested}
              />
            ))
          : [])
      ])}
      {isItemsRemovalEnabled &&
        (items.length >= 1 ? (
          <MenuItem
            alignVariant='center'
            colorVariant={MenuItemColorVariant.Secondary}
            onClick={() => setItems([])}
            title={removeAllItemsTitle}
          />
        ) : (
          <MenuItem
            isDisabled
            title={noItemsMessage ?? defaultNoItemsMessage}
          />
        ))}
    </MuiMenu>
  )
}

export default Menu
