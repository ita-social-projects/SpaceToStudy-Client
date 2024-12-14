import { FC } from 'react'
import { MenuItem as MuiMenuItem } from '@mui/material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'

import { MenuItemProps } from './menu-item.types'

import '~scss-components/menu-item/MenuItem.scss'

const MenuItem: FC<MenuItemProps> = ({
  title,
  additionalInfo,
  density = 1,
  isDropDown = false,
  graphics,
  variant = 'default'
}) => {
  return (
    <MuiMenuItem
      className={`s2s-item s2s-item--density-${density} s2s-item--variant-${variant}`}
      key={title}
    >
      <div className='s2s-item__main-info-box'>
        {graphics && <div className='s2s-item__graphics'>{graphics}</div>}
        <div className='s2s-item__text-box'>
          <span className='s2s-item__additional-info'>{additionalInfo}</span>
          <span className='s2s-item__title'>{title}</span>
        </div>
      </div>
      {isDropDown && (
        <div className='s2s-item__graphics'>
          <ArrowDropDown />
        </div>
      )}
    </MuiMenuItem>
  )
}

export default MenuItem
