import { useTranslation } from 'react-i18next'

import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import useMenu from '~/hooks/use-menu'
import FilterCheckbox from './filter-checkbox/FilterCheckbox'

import { styles } from './EnhancedTableHeaderCell.styles'

const EnhancedTableHeaderCell = ({ column, sort, setFilter, filterArr, onRequestSort }) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu } = useMenu()

  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property)
  }

  const menuItems = column.filterCheckboxesArr?.map((filterCheckbox) => (
    <FilterCheckbox
      filterArr={ filterArr }
      filterCheckbox={ filterCheckbox }
      key={ filterCheckbox.value }
      setFilter={ setFilter }
    />
  ))

  return (
    <TableCell key={ column.field }>
      <TableSortLabel
        active={ sort.orderBy === column.field }
        direction={ sort.orderBy === column.field ? sort.order : 'asc' }
        onClick={ createSortHandler(column.field) }
        sx={ styles.sortLabel }
      >
        { t(column.label) }
      </TableSortLabel>
      { column.filterCheckboxesArr && (
        <>
          <IconButton onClick={ openMenu } sx={ [styles.iconBtn, filterArr.length > 0 ? styles.visible : {}] }>
            <MoreVertIcon color='primary' sx={ styles.icon } />
          </IconButton>

          { renderMenu(menuItems) }
        </>
      ) }
    </TableCell>
  )
}

export default EnhancedTableHeaderCell
