import { ElementType, FC, ReactNode } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

import Loader from '~/components/loader/Loader'
import { ButtonVariantEnum, SizeEnum } from '~/types'

import '~/scss/lib/Button.css'

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
      className={`s2s-button s2s-button__${variant} s2s-button__${size}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? loader : children}
    </Button>
  )
}

export default AppButton
