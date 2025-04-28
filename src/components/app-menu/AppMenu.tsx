import Menu from '~/design-system/components/menu/Menu'

interface AppMenuProps {
  anchorEl: HTMLElement | null
  menuList: {
    title: string
    onClick: () => void
    graphics?: JSX.Element
    sx?: object
    isDisabled?: boolean
  }[]
  onClose: () => void
  open?: boolean
  sx?: object
  maxHeight?: number
}

const AppMenu = ({ anchorEl, menuList, onClose }: AppMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      maxHeight={400}
      menuItems={menuList.map((item) => ({
        ...item,
        sx: item.sx,
        disabled: item.isDisabled
      }))}
      minWidth={200}
      removeAllItemsTitle='Remove All'
      setAnchorEl={onClose}
    />
  )
}

export default AppMenu
