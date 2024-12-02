import { KeyboardEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { InputBaseProps } from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import AppButton from '~/components/app-button/AppButton'
import InputField from '~scss-components/input-field/InputField'

import { ButtonVariantEnum } from '~/types'
import { InputFieldVariantEnum } from '~scss-components/input-field/InputField.constants'

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

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onSearch()
  }

  const getSearchOfferParams = () => {
    const searchParams = new URLSearchParams(document.location.search)
    return searchParams.get('search') ?? ''
  }

  const searchParam = getSearchOfferParams()

  useEffect(() => {
    setSearch(searchParam)
  }, [searchParam])

  return (
    <Box sx={styles.container}>
      <InputField
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        placeholder={t(`${textFieldProps?.placeholder}`)}
        search
        sx={styles.input}
        value={search}
        variant={InputFieldVariantEnum.Small}
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
