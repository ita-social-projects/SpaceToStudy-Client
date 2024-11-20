import { SizeEnum } from '~/types'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { styles } from './AppSwitch.styles'
import { FormControlLabel } from '@mui/material'
interface AppSwitchProps extends Omit<SwitchProps, 'size'> {
  labelPosition?: 'start' | 'end' | 'top' | 'bottom'
  size?: SizeEnum
  label: string
  loading?: boolean
}
export const AppSwitch = ({
  labelPosition,
  size = SizeEnum.Medium,
  label,
  loading,
  disabled,
  ...props
}: AppSwitchProps) => {
  const sizeStyle = styles[size]
  return (
    <FormControlLabel
      control={
        <Switch disabled={loading || disabled} sx={sizeStyle} {...props} />
      }
      label={label}
      labelPlacement={labelPosition}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflow: 'visible'
      }}
    />
  )
}
