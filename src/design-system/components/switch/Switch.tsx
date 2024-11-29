import Switch, { SwitchProps } from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'
import './Switch.scss'
interface AppSwitchProps extends Omit<SwitchProps, 'size'> {
  labelPosition?: 'start' | 'end' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  loading?: boolean
}
export const AppSwitch = ({
  labelPosition = 'end',
  size = 'md',
  label = '',
  loading,
  disabled,
  ...props
}: AppSwitchProps) => {
  return (
    <FormControlLabel
      className={`s2s-form-label-box s2s-form-label-box--${size}`}
      control={
        <Switch
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
