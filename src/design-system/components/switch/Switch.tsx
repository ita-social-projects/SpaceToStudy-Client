import MUISwitch, { SwitchProps } from '@mui/material/Switch'
import { CircularProgress, FormControlLabel } from '@mui/material'
import './Switch.scss'
interface AppSwitchProps extends Omit<SwitchProps, 'size'> {
  labelPosition?: 'start' | 'end' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  loading?: boolean
}

const Switch = ({
  labelPosition = 'end',
  size = 'md',
  label = '',
  loading,
  disabled,
  ...props
}: AppSwitchProps) => {
  const loaderSizes = {
    sm: 21,
    md: 28,
    lg: 35
  }
  const loader = (
    <CircularProgress data-testid='loader' size={loaderSizes[size]} />
  )
  return loading ? (
    loader
  ) : (
    <FormControlLabel
      className={`s2s-form-label-box s2s-form-label-box--${size}`}
      control={
        <MUISwitch
          className={`s2s-switch--${size}`}
          disabled={loading || disabled}
          {...props}
        />
      }
      label={label}
      labelPlacement={labelPosition}
    />
  )
}

export default Switch
