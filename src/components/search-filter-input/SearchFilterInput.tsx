import { useState, Dispatch, SetStateAction, KeyboardEvent } from 'react'
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
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  textFieldProps: TextFieldProps
}

const SearchFilterInput = ({
  search,
  setSearch,
  textFieldProps
}: SearchFilterInputProps) => {
  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState<string>(search)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }

  const onSearch = () => {
    setSearch(searchInput)
  }

  const onClear = () => {
    setSearchInput('')
    setSearch('')
  }

  const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onSearch()
  }

  const labelStyle = {
    ...styles.inputLabel,
    visibility: searchInput && 'hidden'
  }

  const clearIconVisibility = { visibility: searchInput ? 'visible' : 'hidden' }

  return (
    <Box sx={styles.container}>
      <SearchIcon sx={styles.searchIcon} />

      <AppTextField
        InputLabelProps={{ style: labelStyle, shrink: false }}
        InputProps={{ disableUnderline: true }}
        onChange={onInputChange}
        onKeyPress={onEnterPress}
        sx={styles.input}
        value={searchInput}
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
