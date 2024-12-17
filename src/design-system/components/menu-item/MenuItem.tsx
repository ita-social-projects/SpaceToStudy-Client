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
  const graphicsRef = useRef<HTMLDivElement | null>(null)

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

  const handleGraphicsClick = (
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    event.stopPropagation()
    onClick?.()
  }

  const handleEnterOrSpaceKeyDown = (
    event: React.KeyboardEvent,
    handleAction: (event: React.KeyboardEvent) => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleAction(event)
    }
  }

  const handleRemoveItem = (event: React.MouseEvent | React.KeyboardEvent) => {
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
      key={title}
      onClick={handleClick}
    >
      <div className='s2s-item__main-info-box'>
        {graphics && (
          <div
            className='s2s-item__graphics'
            onClick={handleGraphicsClick}
            onKeyDown={handleClick}
            ref={graphicsRef}
            tabIndex={0}
          >
            {graphics}
          </div>
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
        <div
          className='s2s-item__graphics'
          onClick={handleRemoveItem}
          onKeyDown={(event) => {
            handleEnterOrSpaceKeyDown(event, handleRemoveItem)
          }}
          tabIndex={0}
        >
          <CloseRounded className='s2s-item__close' />
        </div>
      )}
    </MuiMenuItem>
  )
}

export default MenuItem
