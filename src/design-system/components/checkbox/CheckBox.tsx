import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { FC, ReactNode, useState } from 'react'
import Loader from '~/components/loader/Loader'

import './CheckBox.scss'

interface CheckBoxProps extends Omit<CheckboxProps, 'size'> {
  variant: 'check' | 'middle'
  label: ReactNode
  labelPosition?: 'top' | 'bottom' | 'end'
  color?: 'primary' | 'secondary' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const CheckBox: FC<CheckBoxProps> = ({
  color = 'primary',
  disabled = false,
  label,
  labelPosition = 'end',
  loading = false,
  variant = 'check',
  size = 'md',
  ...props
}) => {
  const [checked, setChecked] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const blockModifiers = [
    disabled || loading ? 's2s-checkbox--disabled' : '',
    color === 'error' ? 's2s-checkbox--error' : '',
    color === 'success' ? 's2s-checkbox--success' : '',
    `s2s-checkbox--${variant}`,
    `s2s-checkbox--${size}`
  ]
    .filter(Boolean)
    .join(' ')

  const loaderSize = size === 'sm' ? 14 : size === 'md' ? 18 : 20
  const loader = <Loader size={loaderSize} />

  return (
    <label
      aria-busy={loading}
      aria-disabled={disabled || loading}
      className={`s2s-checkbox ${blockModifiers} s2s-checkbox--${labelPosition}`}
      data-testid='checkbox-label'
    >
      {loading ? (
        <span className='s2s-checkbox__loader' data-testid='checkbox-loader'>
          {loader}
        </span>
      ) : (
        <Checkbox
          {...props}
          checked={checked}
          className='s2s-checkbox__input'
          color={color}
          data-testid='checkbox-input'
          disabled={disabled || loading}
          indeterminate={variant === 'middle' && checked}
          onChange={handleChange}
        />
      )}
      <span className='s2s-checkbox__label'>{label}</span>
    </label>
  )
}

export default CheckBox
