import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material'
import { FC } from 'react'

type BadgeColor = 'primary' | 'success' | 'error'

type SmallBadgeProps = {
  variant: 'sm'
  color?: BadgeColor
  isVisible?: boolean
}

type LargeBadgeProps = {
  variant: 'lg'
  badgeContent: number
  maxContent?: number
  color?: BadgeColor
  isVisible?: boolean
  showZero?: boolean
}

type BadgeProps = (LargeBadgeProps | SmallBadgeProps) &
  Omit<MuiBadgeProps, 'variant'>

const Badge: FC<BadgeProps> = ({ children, ...props }) => {
  const displayBadge = (props.isVisible ?? true) ? props.badgeContent : 0
  const badgeVariant = props.variant === 'sm' ? 'dot' : 'standard'
  return (
    <MuiBadge
      badgeContent={displayBadge}
      color={props.color ?? 'primary'}
      data-testid='badge'
      max={props.variant === 'lg' ? (props.maxContent ?? 10) : undefined}
      overlap='circular'
      showZero={props.showZero}
      variant={badgeVariant}
    >
      {children}
    </MuiBadge>
  )
}

export default Badge
