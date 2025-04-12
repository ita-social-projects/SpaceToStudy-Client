import {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  KeyboardEvent
} from 'react'
import { useTranslation } from 'react-i18next'

import {
  AutocompleteProps,
  AutocompleteRenderInputParams
} from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import {
  createFilterOptions,
  FilterOptionsState,
  TextFieldProps
} from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import Button from '~scss-components/button/Button'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { styles } from '~/components/search-autocomplete/SearchAutocomplete.styles'

import { SizeEnum, VisibilityEnum, TextFieldVariantEnum } from '~/types'

interface Options {
  displayName: string
  name: string
}

interface SearchAutocompleteProps
  extends Omit<
    AutocompleteProps<Options | string, false, false, true>,
    'renderInput'
  > {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  onSearchChange?: () => void
  textFieldProps: TextFieldProps<'standard'>
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
}

const SearchAutocomplete = ({
  search,
  setSearch,
  onSearchChange,
  textFieldProps,
  ...props
}: SearchAutocompleteProps) => {
  const [searchInput, setSearchInput] = useState<string>(search)

  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  console.log('options', props.options)

  const onInputChange = (_: SyntheticEvent, value: string) => {
    setSearchInput(value)
  }

  const filterOptions = (
    options: (string | Options)[],
    state: FilterOptionsState<string | Options>
  ) => {
    const defaultFilterOptions = createFilterOptions<string | Options>({
      stringify: (option) =>
        typeof option === 'string' ? option : option.displayName || option.name
    })
    return defaultFilterOptions(options, state).slice(0, 6)
  }

  const handleAutoCompleteChange = (
    _: SyntheticEvent,
    value: string | Options | null
  ) => {
    onSearchChange && onSearchChange()
    setSearch(typeof value === 'string' ? value : (value?.name ?? ''))
  }

  const getOptionLabel = (option: string | Options) =>
    typeof option === 'string' ? option : option.displayName || option.name

  const isOptionEqualToValue = (
    option: string | Options,
    value: string | Options
  ) => {
    if (typeof option === 'string' && typeof value === 'string') {
      return option === value
    }
    if (typeof option !== 'string' && typeof value !== 'string') {
      return option.name === value.name
    }
    return false
  }

  const value =
    props.options.find((item) =>
      typeof item === 'string' ? item === search : item.name === search
    ) ?? null

  const onSearch = () => {
    onSearchChange && searchInput !== search && onSearchChange()
    setSearch(searchInput)
  }

  const onClear = () => {
    onSearchChange && search && onSearchChange()
    setSearchInput('')
    setSearch('')
  }

  const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onSearch()
  }

  const labelStyle = {
    ...styles.inputLabel,
    visibility: searchInput ? VisibilityEnum.Hidden : VisibilityEnum.Visible
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
        getOptionLabel={getOptionLabel}
        hideClearIcon
        inputValue={searchInput}
        isOptionEqualToValue={isOptionEqualToValue}
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
        value={value}
        {...props}
      />

      <IconButton onClick={onClear} sx={clearIconVisibility}>
        <ClearIcon fontSize={SizeEnum.Small} />
      </IconButton>

      <Button onClick={onSearch} size={isMobile ? 'sm' : 'lg'}>
        {isMobile ? <SearchIcon /> : t('common.search')}
      </Button>
    </Box>
  )
}

export default SearchAutocomplete
