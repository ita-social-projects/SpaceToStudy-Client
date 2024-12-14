import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { type ChangeEvent, ReactNode, useCallback, useState } from 'react'
import Loader from '~/components/loader/Loader'
import { cn } from '~/utils/cn'

import './CheckBox.scss'

interface CheckBoxProps extends Omit<CheckboxProps, 'size' | 'onChange'> {
  variant: 'check' | 'middle'
  label: ReactNode
  labelPosition?: 'top' | 'bottom' | 'end'
  color?: 'primary' | 'secondary' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  isChecked?: boolean
  onChange?: (checked: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked: externalIsChecked,
  onChange,
  color = 'primary',
  disabled = false,
  label,
  labelPosition = 'end',
  loading = false,
  variant = 'check',
  size = 'md',
  ...props
}) => {
  const [internalIsChecked, setInternalIsChecked] = useState<boolean>(false)

  const isCheckboxControllable = externalIsChecked !== undefined

  const handleChange = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (!isCheckboxControllable) {
        setInternalIsChecked(checked)
      }

      onChange?.(checked)
    },
    [onChange, isCheckboxControllable]
  )

  const loaderSizeMapping: Record<string, number> = {
    sm: 14,
    md: 18,
    lg: 20
  }

  const loader = <Loader size={loaderSizeMapping[size]} />
  const resolvedIsCheck = isCheckboxControllable
    ? externalIsChecked
    : internalIsChecked

  return (
    <label
      aria-busy={loading}
      aria-disabled={disabled || loading}
      className={cn(
        's2s-checkbox',
        `s2s-checkbox--${labelPosition}`,
        `s2s-checkbox--${variant}`,
        `s2s-checkbox--${size}`,
        (disabled || loading) && 's2s-checkbox--disabled',
        color === 'error' && 's2s-checkbox--error',
        color === 'success' && 's2s-checkbox--success'
      )}
      data-testid='checkbox-label'
    >
      {loading ? (
        <span className='s2s-checkbox__loader' data-testid='checkbox-loader'>
          {loader}
        </span>
      ) : (
        <Checkbox
          {...props}
          checked={resolvedIsCheck}
          className='s2s-checkbox__input'
          color={color}
          data-testid='checkbox-input'
          disabled={disabled || loading}
          indeterminate={variant === 'middle' && resolvedIsCheck}
          onChange={handleChange}
        />
      )}
      <span className='s2s-checkbox__label'>{label}</span>
    </label>
  )
}

export default CheckBox
