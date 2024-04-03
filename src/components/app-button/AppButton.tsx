import { ElementType, ReactNode, forwardRef } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

import Loader from '~/components/loader/Loader'
import { ButtonVariantEnum, SizeEnum } from '~/types'

interface AppButtonProps extends ButtonProps {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  component?: ElementType
  to?: string
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      children,
      loading,
      disabled,
      variant = ButtonVariantEnum.Contained,
      size = SizeEnum.Large,
      ...props
    },
    ref
  ) => {
    const loader = <Loader size={20} sx={{ opacity: '0.6' }} />

    return (
      <Button
        disabled={loading || disabled}
        ref={ref}
        size={size}
        variant={variant}
        {...props}
      >
        {loading ? loader : children}
      </Button>
    )
  }
)

AppButton.displayName = 'AppButton'

export default AppButton
