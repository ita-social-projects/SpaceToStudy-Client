import { FC } from 'react'
import { MenuItem as MuiMenuItem } from '@mui/material'

import { MenuItemProps } from './menu-item.types'

import '~scss-components/menu-item/MenuItem.scss'

const MenuItem: FC<MenuItemProps> = ({
  title,
  additionalInfo,
  density = 1,
  graphics,
  variant = 'default'
}) => {
  return (
    <MuiMenuItem
      className={`s2s-item s2s-item--density-${density} s2s-item--variant-${variant}`}
      key={title}
    >
      {graphics && <div className='s2s-item-graphics'>{graphics}</div>}
      <div className='s2s-item-text-box'>
        <span className='s2s-item-additional-info'>{additionalInfo}</span>
        <span className='s2s-item-title'>{title}</span>
      </div>
    </MuiMenuItem>
  )
}

export default MenuItem
