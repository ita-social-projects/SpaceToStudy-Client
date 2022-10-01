import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import FilterCheckbox from './filter-checkbox/FilterCheckbox'

import { styles } from './EnhancedTableHeaderCell.styles'

const EnhancedTableHeaderCell = ({ column, sort, setFilter, filterArr, onRequestSort }) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const createSortHandler = (property) => (e) => {
    onRequestSort(e, property)
  }

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
          <IconButton onClick={ handleClick } sx={ [styles.iconBtn, filterArr.length > 0 ? styles.visible : {}] }>
            <MoreVertIcon color='primary' sx={ styles.icon } />
          </IconButton>
          <Menu anchorEl={ anchorEl } onClose={ handleClose } open={ Boolean(anchorEl) }>
            { column.filterCheckboxesArr.map((filterCheckbox) => (
              <FilterCheckbox
                filterArr={ filterArr }
                filterCheckbox={ filterCheckbox }
                key={ filterCheckbox.value }
                setFilter={ setFilter }
              />
            )) }
          </Menu>
        </>
      ) }
    </TableCell>
  )
}

export default EnhancedTableHeaderCell
