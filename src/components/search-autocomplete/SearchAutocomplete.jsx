import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { createFilterOptions } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { styles } from '~/components/search-autocomplete/SearchAutocomplete.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  ButtonVariantEnum,
  SizeEnum,
  TextFieldVariantEnum,
  VisibilityEnum
} from '~/types'

const SearchAutocomplete = ({
  search,
  setSearch,
  onSearchChange,
  textFieldProps,
  ...props
}) => {
  const [searchInput, setSearchInput] = useState(search)

  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const filterOptions = (options, state) => {
    const defaultFilterOptions = createFilterOptions()
    return defaultFilterOptions(options, state).slice(0, 6)
  }

  const onInputChange = (_, value) => {
    setSearchInput(value)
  }

  const handleAutoCompleteChange = (_, value) => {
    onSearchChange && onSearchChange()
    setSearch(value)
  }

  const onSearch = () => {
    onSearchChange && searchInput !== search && onSearchChange()
    setSearch(searchInput)
  }

  const onClear = () => {
    onSearchChange && search && onSearchChange()
    setSearchInput('')
    setSearch('')
  }

  const onEnterPress = (event) => {
    event.key === 'Enter' && onSearch()
  }

  const labelStyle = {
    ...styles.inputLabel,
    visibility: searchInput && VisibilityEnum.Hidden
  }
  const clearIconVisibility = {
    visibility: searchInput ? VisibilityEnum.Visible : VisibilityEnum.Hidden
  }

  return (
    <Box sx={styles.container}>
      {!isMobile && <SearchIcon sx={styles.searchIcon} />}

      <AppAutoComplete
        ListboxProps={{ style: styles.listBox }}
        filterOptions={filterOptions}
        freeSolo
        hideClearIcon
        inputValue={searchInput}
        onChange={handleAutoCompleteChange}
        onInputChange={onInputChange}
        sx={{ flex: 1 }}
        textFieldProps={{
          InputLabelProps: { style: labelStyle, shrink: false },
          InputProps: { disableUnderline: true },
          onKeyDown: onEnterPress,
          variant: TextFieldVariantEnum.Standard,
          sx: styles.input,
          ...textFieldProps
        }}
        {...props}
      />

      <IconButton onClick={onClear} sx={clearIconVisibility}>
        <ClearIcon fontSize={SizeEnum.Small} />
      </IconButton>

      <Button
        onClick={onSearch}
        size={isMobile ? SizeEnum.Small : SizeEnum.Large}
        sx={styles.searchBtn}
        variant={ButtonVariantEnum.ContainedLight}
      >
        {isMobile ? <SearchIcon /> : t('common.search')}
      </Button>
    </Box>
  )
}

export default SearchAutocomplete
