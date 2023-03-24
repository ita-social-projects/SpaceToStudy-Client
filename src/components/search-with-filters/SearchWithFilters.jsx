import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { createFilterOptions } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { styles } from '~/components/search-with-filters/SearchWithFilters.styles'

const SearchWithFilters = ({ options, search, setSearch, ...props }) => {
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

  const optionItems = options.map((item) => item.title)

  return (
    <Box sx={styles.container}>
      <SearchIcon sx={styles.searchIcon} />

      <AppAutoComplete
        InputLabelProps={{ style: styles.inputLabel }}
        InputProps={{ disableUnderline: true }}
        ListboxProps={{ style: styles.listBox }}
        autocompleteStyles={{ flex: 1 }}
        data-testid='searchWithFilters'
        fieldValue={searchInput}
        filterOptions={filterOptions}
        freeSolo
        onInputChange={onInputChange}
        options={optionItems}
        sx={styles.input}
        variant='standard'
        {...props}
      />

      <Button onClick={onSearch} sx={styles.searchBtn} variant='contained'>
        {t('categoriesPage.categories.searchBtn')}
      </Button>
    </Box>
  )
}

export default SearchWithFilters
