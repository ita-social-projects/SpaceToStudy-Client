import { FC, ElementType } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

import Loader from '~/components/loader/Loader'
import { ButtonVariantEnum, SizeEnum } from '~/types'

interface AppButtonProps extends ButtonProps {
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
  const loader = (
    <Loader size={20} sx={{ opacity: '0.6', color: 'basic.black' }} />
  )

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
