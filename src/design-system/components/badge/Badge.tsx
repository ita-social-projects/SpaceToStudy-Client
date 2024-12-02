import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material'
import './Badge.scss'

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
  isZeroShown?: boolean
}

type BadgeProps = (LargeBadgeProps | SmallBadgeProps) &
  Omit<MuiBadgeProps, 'variant'>

const Badge: React.FC<BadgeProps> = ({
  children,
  isVisible = true,
  color = 'primary',
  ...props
}) => {
  const badgeContent = isVisible ? props.badgeContent : 0
  const variant = props.variant === 'sm' ? 'dot' : 'standard'
  const maxContent =
    props.variant === 'lg' ? (props.maxContent ?? 10) : undefined
  const isZeroShown =
    props.variant === 'lg' ? (props.isZeroShown ?? false) : undefined

  return (
    <MuiBadge
      badgeContent={badgeContent}
      className={`s2s-badge-${color}`}
      color={color}
      max={maxContent}
      overlap='circular'
      showZero={isZeroShown}
      variant={variant}
    >
      {children}
    </MuiBadge>
  )
}

export default Badge
