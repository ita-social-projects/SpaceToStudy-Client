import { FC } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { TextFieldProps } from '@mui/material/TextField'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import AppTextField from '~/components/app-text-field/AppTextField'

interface FilterInputProps extends Omit<TextFieldProps, 'onChange'> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const FilterInput: FC<FilterInputProps> = ({ value, onChange, ...props }) => {
  const handleClearInput = () => {
    const event = {
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>
    onChange(event)
  }

  const inputProps = {
    endAdornment: value ? (
      <IconButton
        data-testid='clear-button'
        onClick={handleClearInput}
        sx={{ p: 0 }}
      >
        <ClearIcon color='secondary' />
      </IconButton>
    ) : (
      <SearchIcon color='primary' />
    )
  }

  return (
    <AppTextField
      InputProps={inputProps}
      onChange={onChange}
      size='small'
      value={value}
      {...props}
    />
  )
}

export default FilterInput
