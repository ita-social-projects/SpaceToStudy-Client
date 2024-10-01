import { forwardRef, ReactNode } from 'react'
import {
  Button as MuiButton,
  CircularProgress,
  ButtonProps as MuiButtonProps
} from '@mui/material'

import { cn } from '~/utils/cn'

import './AppButtonNew.scss'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

const variants = [
  'primary',
  'tonal',
  'text-primary',
  'text-secondary',
  'tonal-success',
  'tonal-error'
] as const

type BaseAppButtonProps = {
  loading?: boolean
  size?: (typeof sizes)[number]
  variant?: (typeof variants)[number]
  startIcon?: ReactNode
  endIcon?: ReactNode
}

type AppButtonProps = BaseAppButtonProps &
  Omit<MuiButtonProps, keyof BaseAppButtonProps>

type Ref = MuiButtonProps['ref']

const AppButtonNew = forwardRef(
  (
    {
      size = 'md',
      variant = 'primary',
      className,
      disabled,
      loading,
      startIcon,
      endIcon,
      children,
      ...props
    }: AppButtonProps,
    forwardedRef: Ref
  ) => {
    const loader = <CircularProgress color='inherit' size={25} />
    const isDisabled = disabled || loading

    const content = (
      <>
        {startIcon}
        <span className='s2s-btn-label'>{children}</span>
        {endIcon}
      </>
    )

    return (
      <MuiButton
        className={cn(
          's2s-btn',
          `s2s-btn-${size}`,
          `s2s-btn-${variant}`,
          isDisabled && 's2s-btn-disabled',
          className
        )}
        disabled={isDisabled}
        ref={forwardedRef}
        variant='base'
        {...props}
      >
        {loading ? (
          <>
            <span className='s2s-btn-hidden-content'>{content}</span>
            <span className='s2s-btn-loader'>{loader}</span>
          </>
        ) : (
          content
        )}
      </MuiButton>
    )
  }
)
AppButtonNew.displayName = 'AppButtonNew'

export default AppButtonNew
