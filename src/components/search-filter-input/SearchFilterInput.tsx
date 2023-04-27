import { useState, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'

import AppTextField from '~/components/app-text-field/AppTextField'
import { TextFieldProps } from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'

import { styles } from './SearchFilterInput.styles'

interface SearchFilterInputProps {
  updateFilter: (value: string) => void
  textFieldProps: TextFieldProps
}

const SearchFilterInput = ({
  updateFilter,
  textFieldProps
}: SearchFilterInputProps) => {
  const [search, setSearch] = useState<string>('')
  const { t } = useTranslation()

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onSearch = () => {
    updateFilter(search)
  }

  const onClear = () => {
    setSearch('')
    updateFilter('')
  }

  const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onSearch()
  }

  const labelStyle = {
    ...styles.inputLabel,
    visibility: search && 'hidden'
  }

  const clearIconVisibility = { visibility: search ? 'visible' : 'hidden' }

  return (
    <Box sx={styles.container}>
      <SearchIcon sx={styles.searchIcon} />

      <AppTextField
        InputLabelProps={{ style: labelStyle, shrink: false }}
        InputProps={{ disableUnderline: true }}
        onChange={onInputChange}
        onKeyPress={onEnterPress}
        sx={styles.input}
        value={search}
        variant='standard'
        {...textFieldProps}
      />

      <IconButton onClick={onClear} sx={clearIconVisibility}>
        <ClearIcon fontSize='small' />
      </IconButton>

      <Button
        onClick={onSearch}
        size='large'
        sx={styles.searchBtn}
        variant='contained'
      >
        {t('common.search')}
      </Button>
    </Box>
  )
}

export default SearchFilterInput
