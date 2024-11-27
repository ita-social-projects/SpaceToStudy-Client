import '~scss-components/user-avatar/UserAvatar.scss'
import { forwardRef } from 'react'
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { cn } from '~/utils/cn'

const variants = ['check', 'avatar', 'monogram', 'photo'] as const
const sizes = ['sm', 'md', 'lg'] as const

interface BaseUserAvatarProps {
  variant?: (typeof variants)[number]
  src?: string
  size?: (typeof sizes)[number]
  firstName: string
  lastName: string
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
      firstName,
      lastName,
      isOnline,
      onClick,
      ...props
    }: UserAvatarProps,
    forwardedRef: Ref
  ) => {
    const monogram = firstName.charAt(0) + lastName.charAt(0)

    return (
      <div className='s2s-user-avatar'>
        {variant === 'photo' && src ? (
          <MuiAvatar
            alt={monogram}
            className={cn('s2s-avatar', `s2s-avatar-${size}`)}
            onClick={onClick}
            ref={forwardedRef}
            src={src}
            {...props}
          />
        ) : variant === 'monogram' ? (
          <MuiAvatar
            onClick={onClick}
            ref={forwardedRef}
            {...props}
            className={cn('s2s-avatar', `s2s-avatar-${size}`)}
          >
            {monogram}
          </MuiAvatar>
        ) : variant === 'check' ? (
          <MuiAvatar
            onClick={onClick}
            ref={forwardedRef}
            {...props}
            className={cn('s2s-avatar', `s2s-avatar-${size}`)}
          >
            <CheckIcon />
          </MuiAvatar>
        ) : (
          <MuiAvatar
            onClick={onClick}
            ref={forwardedRef}
            {...props}
            className={cn('s2s-avatar', `s2s-avatar-${size}`)}
          />
        )}
        {isOnline && (
          <span
            className={`s2s-user-avatar-status s2s-user-avatar-status-${size}`}
          />
        )}
      </div>
    )
  }
)

UserAvatar.displayName = 'UserAvatar'

export default UserAvatar
