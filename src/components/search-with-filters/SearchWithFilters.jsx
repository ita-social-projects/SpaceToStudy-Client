import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { createFilterOptions } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { styles } from '~/components/search-with-filters/SearchWithFilters.styles'

const SearchWithFilters = ({
  filters,
  options,
  search,
  setSearch,
  textFieldProps,
  ...props
}) => {
  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState(search)

  const filterOptions = (options, state) => {
    const defaultFilterOptions = createFilterOptions()
    return defaultFilterOptions(options, state).slice(0, 6)
  }

  const onInputChange = (_, value) => {
    setSearchInput(value)
  }

  const onSearch = () => {
    setSearch(searchInput)
  }

  return (
    <Box sx={styles.container}>
      {filters}

      <SearchIcon sx={styles.searchIcon} />

      <AppAutoComplete
        ListboxProps={{ style: styles.listBox }}
        data-testid='searchWithFilters'
        filterOptions={filterOptions}
        freeSolo
        hideCLearIcon
        onInputChange={onInputChange}
        options={options}
        sx={{ flex: 1 }}
        textFieldProps={{
          ...textFieldProps,
          InputLabelProps: { style: styles.inputLabel },
          InputProps: { disableUnderline: true },
          sx: styles.input,
          variant: 'standard'
        }}
        value={searchInput}
        {...props}
      />

      <Button onClick={onSearch} sx={styles.searchBtn} variant='contained'>
        {t('common.search')}
      </Button>
    </Box>
  )
}

export default SearchWithFilters
