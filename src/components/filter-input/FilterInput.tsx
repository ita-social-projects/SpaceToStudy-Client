import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { TextFieldProps } from '@mui/material/TextField'

import AppTextField from '~/components/app-text-field/AppTextField'

interface FilterInputProps extends Omit<TextFieldProps, 'onChange'> {
  onChange: (value: string) => void
  value?: string
}

const FilterInput: FC<FilterInputProps> = ({ value, onChange, ...props }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const inputProps = {
    endAdornment: value ? (
      <IconButton
        data-testid='clear-button'
        onClick={() => onChange('')}
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
      onChange={handleInputChange}
      size='small'
      value={value}
      {...props}
    />
  )
}

export default FilterInput
