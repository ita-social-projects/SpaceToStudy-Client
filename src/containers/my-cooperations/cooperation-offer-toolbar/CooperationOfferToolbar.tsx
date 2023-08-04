import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AppSelect from '~/components/app-select/AppSelect'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import { FilterHook } from '~/hooks/table/use-filter'
import { SortHook } from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDebounce } from '~/hooks/use-debounce'

import { styles } from '~/containers/my-cooperations/cooperation-offer-toolbar/CooperationOfferToolbar.styles'
import {
  CardsView,
  CardsViewEnum,
  MyCooperationsFilters,
  SelectFieldType
} from '~/types'

interface CooperationOfferToolbarProps {
  filterOptions: FilterHook<MyCooperationsFilters>
  sortFields: SelectFieldType<string>[]
  withoutSort?: boolean
  sortOptions: SortHook
  view: CardsViewEnum
  onChangeView: (value: CardsViewEnum) => void
}

const CooperationOfferToolbar: FC<CooperationOfferToolbarProps> = ({
  filterOptions,
  sortFields,
  withoutSort,
  view,
  onChangeView,
  sortOptions
}) => {
  const { filters, setFilterByKey } = filterOptions
  const [inputValue, setInputValue] = useState(filters.search)
  const { sort, onRequestSort, resetSort } = sortOptions
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()

  useEffect(() => {
    setInputValue('')
  }, [filters.status])

  const changeSearch = setFilterByKey('search')
  const debouncedSearchChange = useDebounce(changeSearch)

  const handleViewChange = (value: CardsView) => {
    resetSort()
    onChangeView(value)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    debouncedSearchChange(e.target.value)
  }

  const handleInputReset = () => {
    changeSearch('')
    setInputValue('')
  }

  return (
    <Box sx={styles.root}>
      <InputWithIcon
        onChange={handleInputChange}
        onClear={handleInputReset}
        placeholder={t('cooperationsPage.search')}
        startIcon={<SearchIcon sx={styles.searchIcon} />}
        sx={styles.input}
        value={inputValue}
      />
      <Box sx={styles.actionBlock}>
        {!withoutSort && (
          <AppSelect
            fields={sortFields}
            setValue={onRequestSort}
            sx={styles.select}
            value={`${sort.orderBy} ${sort.order}`}
          />
        )}
        {!isMobile && <ViewSwitcher onChange={handleViewChange} value={view} />}
      </Box>
    </Box>
  )
}

export default CooperationOfferToolbar
