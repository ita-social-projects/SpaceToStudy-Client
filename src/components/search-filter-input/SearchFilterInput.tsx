import { KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AppTextField from '~/components/app-text-field/AppTextField'
import { TextFieldProps } from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'

import { SizeEnum, VariantEnum, VisibilityEnum } from '~/types'

import { styles } from '~/components/search-filter-input/SearchFilterInput.styles'

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

  const labelStyle = {
    ...styles.inputLabel,
    visibility: search ? VisibilityEnum.Hidden : VisibilityEnum.Visible
  }

  const clearIconVisibility = {
    visibility: search ? VisibilityEnum.Visible : VisibilityEnum.Hidden
  }

  return (
    <Box sx={styles.container}>
      <SearchIcon sx={styles.searchIcon} />

      <AppTextField
        InputLabelProps={{ style: labelStyle, shrink: false }}
        InputProps={{ disableUnderline: true }}
        onChange={onChange}
        onKeyPress={onEnterPress}
        sx={styles.input}
        value={search}
        variant={VariantEnum.Standard}
        {...textFieldProps}
      />

      <IconButton onClick={onClear} sx={clearIconVisibility}>
        <ClearIcon data-testid='clearIcon' fontSize={SizeEnum.Large} />
      </IconButton>

      <Button
        onClick={onSearch}
        size={SizeEnum.Large}
        sx={styles.searchBtn}
        variant={VariantEnum.ContainedLight}
      >
        {t('common.search')}
      </Button>
    </Box>
  )
}

export default SearchFilterInput
