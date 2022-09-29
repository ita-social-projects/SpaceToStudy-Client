import { useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const EnhancedTableRow = ({
  item,
  isItemSelected,
  handleSelectClick,
  refetchData,
  isSelection,
  rowPropsArr,
  rowActions
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onAction = async (actionFunc) => {
    await actionFunc(item._id)
    refetchData()
  }

  const tableCells = rowPropsArr.map(({ propKey, component }) => {
    let propValue = ''
    if (Array.isArray(propKey)) {
      const propValues = propKey.map((prop) => item[prop])
      propValue = propValues.join(' ')
    } else {
      propValue = item[propKey]?.toString()
    }

    return (
      <TableCell key={ propKey.toString() }>
        { component(propValue) }
      </TableCell>
    )
  })

  return (
    <TableRow hover key={ item._id } selected={ isItemSelected }>
      { isSelection && (
        <TableCell padding='checkbox'>
          <Checkbox checked={ isItemSelected } color='primary' onChange={ (e) => handleSelectClick(e, item._id) } />
        </TableCell>
      ) }
      { tableCells }
      { isSelection && (
        <TableCell>
          <IconButton onClick={ handleOpen }>
            <MoreVertIcon
              color='primary'
              sx={ {
                fontSize: '20px'
              } }
            />
          </IconButton>
          <Menu
            anchorEl={ anchorEl } id={ item._id } onClose={ handleClose }
            open={ Boolean(anchorEl) }
          >
            { rowActions.map(({ label, func }) => (
              <MenuItem key={ label } onClick={ () => onAction(func) }>
                { label }
              </MenuItem>
            )) }
          </Menu>
        </TableCell>
      ) }
    </TableRow>
  )
}

export default EnhancedTableRow
