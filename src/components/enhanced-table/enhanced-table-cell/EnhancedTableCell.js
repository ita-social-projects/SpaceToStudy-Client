import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import FilterCheckbox from './filter-checkbox/FilterCheckbox'

import { styles } from './EnhancedTableCell.styles'

const EnhancedTableCell = ({ headCell, order, orderBy, setFilter, filterArr, onRequestSort }) => {
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
    <TableCell key={ headCell.id }>
      <TableSortLabel
        active={ orderBy === headCell.id }
        direction={ orderBy === headCell.id ? order : 'asc' }
        onClick={ createSortHandler(headCell.id) }
        sx={ styles.sortLabel }
      >
        { headCell.label }
      </TableSortLabel>
      { headCell.filterCheckboxesArr && (
        <>
          <IconButton onClick={ handleClick } sx={ [styles.iconBtn, filterArr.length && styles.visible] }>
            <MoreVertIcon color='primary' sx={ styles.icon } />
          </IconButton>
          <Menu anchorEl={ anchorEl } onClose={ handleClose } open={ Boolean(anchorEl) }>
            { headCell.filterCheckboxesArr.map((filter) => (
              <FilterCheckbox
                filter={ filter } filterArr={ filterArr } key={ filter.value }
                setFilter={ setFilter }
              />
            )) }
          </Menu>
        </>
      ) }
    </TableCell>
  )
}

export default EnhancedTableCell
