import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ClearIcon from '@mui/icons-material/Clear'

import useMenu from '~/hooks/use-menu'
import FilterCheckbox from '~/components/enhanced-table/filter-checkbox/FilterCheckbox'

interface FilterEnum {
  value: string
  label: string
}

interface EnumFilterProps {
  column: {
    filterEnum: FilterEnum[]
  }
  filter: string[]
  setFilter: (filter: string[]) => void
  clearFilter: () => void
}

const EnumFilter: React.FC<EnumFilterProps> = ({
  column,
  filter,
  setFilter,
  clearFilter
}) => {
  const { renderMenu, openMenu } = useMenu()

  const isFilterEmpty = filter.length === 0

  const menuItems = column.filterEnum.map((filterEnum) => (
    <FilterCheckbox
      data-testid='filter-checkbox'
      filter={filter}
      filterCheckbox={filterEnum}
      key={filterEnum.value}
      setFilter={setFilter}
    />
  ))

  const endAdornment = (
    <IconButton
      aria-hidden={isFilterEmpty}
      className={!isFilterEmpty ? 'visible' : 'hidden'}
      data-testid='clear-icon-in-filter'
      onClick={clearFilter}
    >
      <ClearIcon color='primary' />
    </IconButton>
  )

  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <IconButton data-testid='filter-icon' onClick={openMenu}>
              <FilterAltIcon color='primary' />
            </IconButton>
          ),
          endAdornment: endAdornment,
          readOnly: true
        }}
        sx={{ width: '70%' }}
        variant='standard'
      />
      {renderMenu(menuItems)}
    </>
  )
}

export default EnumFilter
