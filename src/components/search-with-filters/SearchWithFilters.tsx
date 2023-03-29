import { useState, Dispatch, SetStateAction, FC } from 'react'
import { useTranslation } from 'react-i18next'

import { createFilterOptions, FilterOptionsState } from '@mui/material'
import { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { styles } from '~/components/search-with-filters/SearchWithFilters.styles'

interface SearchWithFiltersProps {
  loading?: boolean
  options: string[]
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  textFieldProps: TextFieldProps
}

const SearchWithFilters: FC<SearchWithFiltersProps> = ({ options, search, setSearch, textFieldProps, ...props }) => {
  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState(search)
  const [focused, setFocused] = useState(false)

  const filterOptions = (options: string[], state: FilterOptionsState<string>) => {
    const defaultFilterOptions = createFilterOptions<string>()
    return defaultFilterOptions(options, state).slice(0, 6)
  }

  const onInputChange = (_: Event, value: string) => {
    setSearchInput(value)
  }

  const onSearch = () => {
    setSearch(searchInput)
  }

  const onClear = () => {
    setSearchInput('')
    setSearch('')
  }

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  const hideLabel = (focused || searchInput) && { visibility: 'hidden' }
  const clearIconVisibility = { visibility: searchInput ? 'visible' : 'hidden' }

  return (
    <Box sx={ styles.container }>
      <SearchIcon sx={ styles.searchIcon } />

      <AppAutoComplete
        ListboxProps={ { style: styles.listBox } }
        autoComplete
        filterOptions={ filterOptions }
        freeSolo
        hideCLearIcon
        inputValue={ searchInput }
        onBlur={ onBlur }
        onFocus={ onFocus }
        onInputChange={ onInputChange }
        options={ options }
        sx={ { flex: 1 } }
        textFieldProps={ {
          ...textFieldProps,
          InputLabelProps: { style: { ...styles.inputLabel, ...hideLabel }, shrink: false },
          InputProps: { disableUnderline: true },
          sx: styles.input,
          variant: 'standard'
        } }
        { ...props }
      />

      <IconButton onClick={ onClear } sx={  clearIconVisibility  }>
        <ClearIcon fontSize='small' />
      </IconButton>

      <Button onClick={ onSearch } sx={ styles.searchBtn } variant='contained'>
        { t('categoriesPage.searchBtn') }
      </Button>
    </Box>
  )
}

export default SearchWithFilters
