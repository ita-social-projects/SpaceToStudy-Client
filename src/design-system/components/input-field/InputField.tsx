import './InputField.scss'
import { InputFieldVariantEnum } from '~/types'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { InputBaseProps } from '@mui/material/InputBase'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

export interface InputFieldProps extends InputBaseProps {
  variant: InputFieldVariantEnum
  label?: string
  disabled?: boolean
  value: string
  placeholder: string
  helperText?: string
  search?: boolean
  error?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  variant = InputFieldVariantEnum.Small,
  label,
  disabled,
  value,
  placeholder,
  helperText,
  error,
  search,
  onChange,
  sx
}) => {
  const clearInput = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
  }
  return (
    <Box sx={sx as SxProps}>
      <div
        className={`s2s-input-container s2s-input-container_${variant} ${
          disabled ? 's2s-input-container_disabled' : ''
        } ${error ? 's2s-input-container_error' : ''}`}
      >
        {search && <SearchIcon className='s2s-search-icon' />}

        <input
          className='s2s-input-field'
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />

        <label className='s2s-input-label'>{label}</label>
        {error ? (
          <ErrorOutlineIcon className='s2s-error-icon' />
        ) : (
          <ClearIcon className='s2s-clear-icon' onClick={clearInput} />
        )}
      </div>
      {helperText && (
        <div className={`s2s-helper-text-container`}>
          <span className={error ? 's2s-helper-text-error' : 's2s-helper-text'}>
            {helperText}
          </span>
        </div>
      )}
    </Box>
  )
}

export default InputField
