import { forwardRef } from 'react'
import {
  Radio,
  RadioProps as MuiRadioProps,
  FormControlLabel,
  CircularProgress
} from '@mui/material'
import { cn } from '~/utils/cn'
import './RadioButton.scss'

const sizes = ['sm', 'md', 'lg'] as const
const colors = ['primary', 'success', 'error'] as const

type BaseRadioButtonProps = {
  label: string
  labelPosition?: 'top' | 'bottom' | 'end'
  size?: (typeof sizes)[number]
  color?: (typeof colors)[number]
  loading?: boolean
  checked?: boolean
}

export type RadioButtonProps = BaseRadioButtonProps &
  Omit<MuiRadioProps, keyof BaseRadioButtonProps>

const RadioButton = forwardRef<HTMLDivElement, RadioButtonProps>(
  (
    {
      label,
      labelPosition = 'end',
      size = 'md',
      color = 'primary',
      className,
      disabled = false,
      loading = false,
      checked = false,
      ...props
    },
    forwardedRef
  ) => {
    const isDisabled = disabled || loading

    const radioClassNames = cn(
      `radio-${size}`,
      `radio-${color}`,
      { 'radio-checked': checked, 'radio-disabled': isDisabled },
      className
    )

    const formControlClassNames = cn(
      's2s-radio-btn',
      `s2s-radio-btn-${size}`,
      `s2s-radio-btn-${color}`,
      { 's2s-radio-btn-disabled': isDisabled },
      className
    )

    return (
      <FormControlLabel
        className={formControlClassNames}
        control={
          (loading && (
            <CircularProgress className='radio-btn-loader' size={20} />
          )) || (
            <Radio
              {...props}
              checked={checked}
              className={radioClassNames}
              disabled={isDisabled}
            />
          )
        }
        label={label}
        labelPlacement={labelPosition}
        ref={forwardedRef}
      />
    )
  }
)

RadioButton.displayName = 'RadioButton'

export default RadioButton
