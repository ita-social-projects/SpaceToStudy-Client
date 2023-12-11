import { FC, ElementType, ReactNode } from 'react'
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

const AppButton: FC<AppButtonProps> = ({
  children,
  loading,
  disabled,
  variant = ButtonVariantEnum.Contained,
  size = SizeEnum.Large,
  ...props
}) => {
  const loader = <Loader size={20} sx={{ opacity: '0.6' }} />

  return (
    <Button
      disabled={loading || disabled}
      size={size}
      variant={variant}
      {...props}
    >
      {loading ? loader : children}
    </Button>
  )
}

export default AppButton
