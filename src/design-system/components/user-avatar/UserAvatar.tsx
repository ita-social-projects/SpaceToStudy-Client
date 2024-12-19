import '~scss-components/user-avatar/UserAvatar.scss'
import { forwardRef } from 'react'
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { cn } from '~/utils/cn'

const variants = ['check', 'avatar', 'monogram', 'photo'] as const
const sizes = ['sm', 'md', 'lg', 'profile-lg'] as const

interface BaseUserAvatarProps {
  variant?: (typeof variants)[number]
  src?: string
  size?: (typeof sizes)[number]
  firstName?: string
  lastName?: string
  isOnline?: boolean
}

export type UserAvatarProps = BaseUserAvatarProps &
  Omit<MuiAvatarProps, keyof BaseUserAvatarProps>

type Ref = MuiAvatarProps['ref']
const UserAvatar = forwardRef(
  (
    {
      variant = 'avatar',
      src,
      size = 'sm',
      firstName = '',
      lastName = '',
      isOnline,
      onClick,
      ...props
    }: UserAvatarProps,
    forwardedRef: Ref
  ) => {
    const monogram = firstName.charAt(0) + lastName.charAt(0)

    const avatarClass = cn('s2s-avatar', `s2s-avatar-${size}`)

    let avatarContent
    if (variant === 'photo' && src) {
      avatarContent = (
        <MuiAvatar
          alt={monogram}
          className={avatarClass}
          onClick={onClick}
          ref={forwardedRef}
          src={src}
          {...props}
        />
      )
    } else if (variant === 'monogram') {
      avatarContent = (
        <MuiAvatar
          onClick={onClick}
          ref={forwardedRef}
          {...props}
          className={avatarClass}
        >
          {monogram}
        </MuiAvatar>
      )
    } else if (variant === 'check') {
      avatarContent = (
        <MuiAvatar
          onClick={onClick}
          ref={forwardedRef}
          {...props}
          className={avatarClass}
        >
          <CheckIcon />
        </MuiAvatar>
      )
    } else {
      avatarContent = (
        <MuiAvatar
          onClick={onClick}
          ref={forwardedRef}
          {...props}
          className={avatarClass}
        />
      )
    }

    return (
      <div className='s2s-user-avatar'>
        {avatarContent}
        {isOnline && (
          <span
            className={cn(
              's2s-user-avatar-status',
              `s2s-user-avatar-status-${size}`
            )}
          />
        )}
      </div>
    )
  }
)

UserAvatar.displayName = 'UserAvatar'
export default UserAvatar
