import { KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { InputBaseProps } from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

import AppButton from '~/components/app-button/AppButton'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import { VariantEnum } from '~/types'
import { styles } from '~/components/search-filter-input/SearchFilterInput.styles'

interface SearchFilterInputProps {
  updateFilter: (value: string) => void
  textFieldProps: InputBaseProps
}

const SearchFilterInput = ({
  updateFilter,
  textFieldProps
}: SearchFilterInputProps) => {
  const [search, setSearch] = useState<string>('')
  const { t } = useTranslation()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        variant={VariantEnum.ContainedLight}
      >
        {t('common.search')}
      </AppButton>
    </Box>
  )
}

export default SearchFilterInput
