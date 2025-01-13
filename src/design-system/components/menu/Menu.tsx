import { forwardRef, useState } from 'react'
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

import './Menu.scss'

const dafaultRemoveAllItemsTitle = 'Clear all'
const defaultNoItemsMessage = 'No items.'

interface NestedMenuItemProps extends CommonMenuItemProps {
  defaultOnItemClickArgs?: OnItemClickArgs
  isInitiallyToggled?: boolean
}

interface MenuItemProps extends NestedMenuItemProps {
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
  removeAllItemsTitle: string
  transformOrigin?: PopoverOrigin
  toggledItemsTitles?: string[]
  onToggleItemsChange?: (newTitles: string[]) => void
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      anchorEl,
      setAnchorEl,
      menuItems,
      defaultOnItemClick,
      maxHeight,
      minWidth,
      removeAllItemsTitle = dafaultRemoveAllItemsTitle,
      noItemsMessage = defaultNoItemsMessage,
      density = 1,
      allowToggleMultipleItems = false,
      isItemsRemovalEnabled = false,
      toggledItemsTitles: customToggledItemsTitles,
      onToggleItemsChange,
      ...menuProps
    },
    ref
  ) => {
    const [items, setItems] = useState<MenuItemProps[]>(menuItems)
    const [internalToggledItemsTitles, setInternalToggledItemsTitles] =
      useState<string[]>(
        allowToggleMultipleItems
          ? menuItems
              .filter((item) => item.isInitiallyToggled)
              .map((item) => item.title)
          : []
      )

    const toggledItemsTitles =
      customToggledItemsTitles && onToggleItemsChange
        ? customToggledItemsTitles
        : internalToggledItemsTitles

    const setToggledItemsTitles = (
      updater: (prevItems: string[]) => string[]
    ) => {
      onToggleItemsChange
        ? onToggleItemsChange(updater(toggledItemsTitles))
        : setInternalToggledItemsTitles(updater)
    }

    const toggleAsSingleItem = (itemTitle: string) => {
      setToggledItemsTitles((previousItems) => {
        return previousItems.includes(itemTitle) ? [] : [itemTitle]
      })
    }

    const toggleAsOneOfMultipleItems = (itemTitle: string) => {
      setToggledItemsTitles((previousItems) => {
        return previousItems.includes(itemTitle)
          ? previousItems.filter((item) => item !== itemTitle)
          : [...previousItems, itemTitle]
      })
    }

    const handleMenuClose = () => {
      setAnchorEl(null)
    }

    const handleItemClick = ({
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

      setToggledItemsTitles(() => [])
      handleMenuClose()
    }

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
        ref={ref}
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
          ...(toggledItemsTitles.includes(item.title) && item.nestedMenuItems
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
            <MenuItem isDisabled title={noItemsMessage} />
          ))}
      </MuiMenu>
    )
  }
)

Menu.displayName = 'Menu'

export default Menu
