import Button from '@mui/material/Button'

import Loader from '~/components/loader/Loader'

const AppButton = ({
  children,
  loading,
  disabled,
  variant = 'contained',
  size = 'large',
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
