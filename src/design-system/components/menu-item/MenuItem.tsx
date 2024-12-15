import { FC } from 'react'
import { MenuItem as MuiMenuItem } from '@mui/material'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

import { MenuItemProps as CommonMenuItemProps } from './menu-item.types'

import '~scss-components/menu-item/MenuItem.scss'
import { cn } from '~/utils/cn'

interface MenuItemProps extends CommonMenuItemProps {
  additionalInfo?: string
  isDropdown?: boolean
  density?: 1 | 2
  isToggled?: boolean
  variant?: 'default' | 'nested'
}

const MenuItem: FC<MenuItemProps> = ({
  title,
  additionalInfo,
  colorVariant = 'default',
  density = 1,
  isDropdown = false,
  isToggled = false,
  isBottomBorder = false,
  isDisabled = false,
  graphics,
  variant = 'default',
  onClick = () => {}
}) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <MuiMenuItem
      className={cn(
        's2s-item',
        `s2s-item--density-${density}`,
        `s2s-item--variant-${variant}`,
        `s2s-item--color-${colorVariant}`,
        isToggled && 's2s-item--toggled',
        isBottomBorder && 's2s-item--bottom-border',
        isDisabled && 's2s-item--disabled'
      )}
      disabled={isDisabled}
      key={title}
      onClick={handleClick}
    >
      <div className='s2s-item__main-info-box'>
        {graphics && <div className='s2s-item__graphics'>{graphics}</div>}
        <div className='s2s-item__text-box'>
          <span className='s2s-item__additional-info'>{additionalInfo}</span>
          <span className='s2s-item__title'>{title}</span>
        </div>
      </div>
      {isDropdown && (
        <div className='s2s-item__graphics'>
          {isToggled ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
      )}
    </MuiMenuItem>
  )
}

export default MenuItem
