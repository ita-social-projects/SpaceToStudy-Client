import { SizeEnum } from '~/types'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { switchStyles, formLabelStyles } from './AppSwitch.styles'
import { FormControlLabel } from '@mui/material'
interface AppSwitchProps extends Omit<SwitchProps, 'size'> {
  labelPosition?: 'start' | 'end' | 'top' | 'bottom'
  size?: SizeEnum
  label?: string
  loading?: boolean
}
export const AppSwitch = ({
  labelPosition = 'end',
  size = SizeEnum.Small,
  label,
  loading,
  disabled,
  ...props
}: AppSwitchProps) => {
  const sizeStyle = switchStyles[size]
  return (
    <FormControlLabel
      control={
        <Switch disabled={loading || disabled} sx={sizeStyle} {...props} />
      }
      label={label ?? ''}
      labelPlacement={labelPosition}
      sx={formLabelStyles.formLabelBox}
    />
  )
}
