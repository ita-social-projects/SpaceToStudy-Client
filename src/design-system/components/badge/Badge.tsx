import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material'

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
  const displayBadge = isVisible ? props.badgeContent : 0
  const badgeVariant = props.variant === 'sm' ? 'dot' : 'standard'
  const maxContentShown =
    props.variant === 'lg' ? (props.maxContent ?? 10) : undefined
  const maxShown =
    props.variant === 'lg' ? (props.isZeroShown ?? false) : undefined

  return (
    <MuiBadge
      badgeContent={displayBadge}
      color={color}
      max={maxContentShown}
      overlap='circular'
      showZero={maxShown}
      variant={badgeVariant}
    >
      {children}
    </MuiBadge>
  )
}

export default Badge
