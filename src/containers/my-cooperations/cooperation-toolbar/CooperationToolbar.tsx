import { ChangeEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/my-cooperations/cooperation-toolbar/CooperationToolbar.styles'
import { FilterHook } from '~/hooks/table/use-filter'
import { MyCooperationsFilters, SelectFieldType } from '~/types'

interface CooperationToolbarProps {
  filterOptions: FilterHook<MyCooperationsFilters>
  sortOptions: SelectFieldType<string>[]
}

const CooperationToolbar: FC<CooperationToolbarProps> = ({
  filterOptions,
  sortOptions
}) => {
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()
  const { filters, setFilterByKey } = filterOptions

  const changeSearch = setFilterByKey('search')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    changeSearch(e.target.value)
  const handleReset = () => changeSearch('')

  return (
    <Box sx={styles.root}>
      <InputWithIcon
        onChange={handleChange}
        onClear={handleReset}
        placeholder={t('common.search')}
        startIcon={<SearchIcon sx={styles.searchIcon} />}
        sx={styles.input}
        value={filters.search}
      />
      <Box sx={styles.actionBlock}>
        <AppSelect
          fields={sortOptions}
          setValue={setFilterByKey('sort')}
          sx={styles.select}
          value={filters.sort}
        />
        {!isMobile && (
          <ViewSwitcher
            onChange={setFilterByKey('view')}
            value={filters.view}
          />
        )}
      </Box>
    </Box>
  )
}

export default CooperationToolbar
