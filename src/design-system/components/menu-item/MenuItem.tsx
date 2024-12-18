import { FC, useRef } from 'react'
import { MenuItem as MuiMenuItem } from '@mui/material'
import { ArrowDropDown, ArrowDropUp, CloseRounded } from '@mui/icons-material'

import { MenuItemProps as CommonMenuItemProps } from './MenuItem.types'
import { MenuItemColorVariant, MenuItemVariant } from './MenuItem.constants'
import { cn } from '~/utils/cn'

import '~scss-components/menu-item/MenuItem.scss'

interface MenuItemProps extends CommonMenuItemProps {
  isDropdown?: boolean
  density?: 1 | 2
  isToggled?: boolean
  onRemove?: () => void
  variant?: MenuItemVariant
}

const MenuItem: FC<MenuItemProps> = ({
  title,
  additionalInfo,
  alignVariant = 'left',
  colorVariant = MenuItemColorVariant.Default,
  density = 1,
  graphics,
  isDropdown = false,
  isToggled = false,
  isBottomBorder = false,
  isDisabled = false,
  onClick,
  onRemove,
  variant = MenuItemVariant.Default
}) => {
  const graphicsRef = useRef<HTMLButtonElement | null>(null)

  const handleClick = () => {
    if (graphicsRef.current) {
      const interactiveElement =
        graphicsRef.current.querySelector<HTMLInputElement>(
          'input[type="radio"], input[type="checkbox"], [role="radio"], [role="checkbox"]'
        )

      if (interactiveElement) {
        interactiveElement.click()
        return
      }
    }

    onClick?.()
  }

  const handleGraphicsClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onClick?.()
  }

  const handleRemoveItem = (event: React.MouseEvent) => {
    event.stopPropagation()
    onRemove?.()
  }

  return (
    <MuiMenuItem
      className={cn(
        's2s-item',
        `s2s-item--density-${density}`,
        `s2s-item--variant-${variant}`,
        `s2s-item--color-${colorVariant}`,
        `s2s-item--align-${alignVariant}`,
        isToggled && 's2s-item--toggled',
        isBottomBorder && 's2s-item--bottom-border',
        isDisabled && 's2s-item--disabled'
      )}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <div className='s2s-item__main-info-box'>
        {graphics && (
          <button
            className='s2s-item__graphics'
            onClick={handleGraphicsClick}
            ref={graphicsRef}
          >
            {graphics}
          </button>
        )}
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
      {onRemove && !isDropdown && !isDisabled && (
        <button className='s2s-item__graphics' onClick={handleRemoveItem}>
          <CloseRounded className='s2s-item__close' />
        </button>
      )}
    </MuiMenuItem>
  )
}

export default MenuItem
