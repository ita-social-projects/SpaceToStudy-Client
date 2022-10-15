import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ClearIcon from '@mui/icons-material/Clear'

import useMenu from '~/hooks/use-menu'
import FilterCheckbox from '~/components/enhanced-table/filter-checkbox/FilterCheckbox'

const EnumFilter = ({ column, filter, setFilter, clearFilter }) => {
  const { renderMenu, openMenu } = useMenu()

  const menuItems = column.filterEnum.map((filterEnum) => (
    <FilterCheckbox
      filter={ filter } filterCheckbox={ filterEnum } key={ filterEnum.value }
      setFilter={ setFilter }
    />
  ))

  const endAdornment = (
    <IconButton className={ filter.length ? 'visible' : 'hidden' } onClick={ clearFilter }>
      <ClearIcon color='primary' />
    </IconButton>
  )

  return (
    <>
      <TextField
        InputProps={ {
          startAdornment: (
            <IconButton onClick={ openMenu }>
              <FilterAltIcon color='primary' />
            </IconButton>
          ),
          endAdornment: endAdornment,
          readOnly: true
        } }
        sx={ { width: '70%' } }
        variant='standard'
      />
      { renderMenu(menuItems) }
    </>
  )
}

export default EnumFilter
