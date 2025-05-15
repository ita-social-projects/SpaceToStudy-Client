import Menu from '~/design-system/components/menu/Menu'
import { MenuItemColorVariant } from '~/design-system/components/menu-item/MenuItem.constants'

interface AppMenuProps {
  anchorEl: HTMLElement | null
  menuList: {
    title: string
    onClick: () => void
    graphics?: JSX.Element
    sx?: object
    isDisabled?: boolean
    colorVariant?: MenuItemColorVariant
    density?: 1 | 2
  }[]
  onClose: () => void
  maxHeight?: number
  minWidth?: number
}

const AppMenu = ({
  anchorEl,
  menuList,
  onClose,
  minWidth = 200,
  maxHeight = 400
}: AppMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      maxHeight={maxHeight}
      menuItems={menuList.map((item) => ({
        ...item,
        disabled: item.isDisabled
      }))}
      minWidth={minWidth}
      removeAllItemsTitle='Remove All'
      setAnchorEl={onClose}
    />
  )
}

export default AppMenu
