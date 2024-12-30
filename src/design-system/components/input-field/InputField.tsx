import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { cn } from '~/utils/cn'

import InputBase, { InputBaseProps } from '@mui/material/InputBase'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import { InputFieldVariantEnum } from './InputField.constants'
import '~scss-components/input-field/InputField.scss'
import { forwardRef } from 'react'

type BaseInputFieldProps = {
  variant?: InputFieldVariantEnum
  label?: string
  disabled?: boolean
  value: string
  placeholder: string
  helperText?: string
  search?: boolean
  error?: boolean
  onClear?: () => void
}

export type InputFieldProps = BaseInputFieldProps &
  Omit<InputBaseProps, keyof BaseInputFieldProps>

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      variant = InputFieldVariantEnum.Small,
      label,
      disabled,
      value,
      placeholder,
      helperText,
      error,
      search,
      onChange,
      onClear,
      sx,
      ...props
    },
    ref
  ) => {
    const shouldShowClearIcon = !disabled && value
    return (
      <Box sx={sx as SxProps}>
        <div
          className={cn(
            's2s-input-container',
            `s2s-input-container_${variant}`,
            {
              's2s-input-container_disabled': disabled,
              's2s-input-container_error': error
            }
          )}
        >
          {search && <SearchIcon className='s2s-search-icon' />}

          <InputBase
            className='s2s-input-field'
            disabled={disabled}
            inputRef={ref}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            {...props}
          />
          {label && <label className='s2s-input-label'>{label}</label>}
          {error ? (
            <ErrorOutlineIcon className='s2s-error-icon' />
          ) : (
            shouldShowClearIcon && (
              <ClearIcon
                className='s2s-clear-icon'
                data-testid='clearIcon'
                onClick={onClear}
              />
            )
          )}
        </div>
        {helperText && (
          <div className='s2s-helper-text-container'>
            <span
              className={cn('s2s-helper-text', {
                's2s-helper-text-error': error
              })}
            >
              {helperText}
            </span>
          </div>
        )}
      </Box>
    )
  }
)

InputField.displayName = 'InputFiled'

export default InputField
