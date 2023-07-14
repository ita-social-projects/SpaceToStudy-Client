import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import { styles } from '~/components/search-filter-input/SearchFilterInput.styles'
import { ButtonVariantEnum } from '~/types'

const SearchFilterInput = ({ updateFilter, textFieldProps }) => {
  const [search, setSearch] = useState('')
  const { t } = useTranslation()

  const onChange = (event) => {
    setSearch(event.target.value)
  }

  const onSearch = () => {
    updateFilter(search)
  }

  const onClear = () => {
    setSearch('')
    updateFilter('')
  }

  const onEnterPress = (event) => {
    event.key === 'Enter' && onSearch()
  }

  return (
    <Box sx={styles.container}>
      <InputWithIcon
        onChange={onChange}
        onClear={onClear}
        onKeyPress={onEnterPress}
        startIcon={<SearchIcon sx={styles.searchIcon} />}
        sx={styles.input}
        value={search}
        {...textFieldProps}
      />

      <AppButton
        onClick={onSearch}
        sx={styles.searchBtn}
        variant={ButtonVariantEnum.ContainedLight}
      >
        {t('common.search')}
      </AppButton>
    </Box>
  )
}

export default SearchFilterInput
