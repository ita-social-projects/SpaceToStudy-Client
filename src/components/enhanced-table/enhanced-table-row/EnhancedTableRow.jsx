import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import useMenu from '~/hooks/use-menu'
import useSelect from '~/hooks/table/use-select'
import { useTableContext } from '~/context/table-context'

const EnhancedTableRow = ({ item, isItemSelected, refetchData, role }) => {
  const { isSelection, columns, rowActions } = useTableContext()
  const { handleSelectClick } = useSelect()

  const { openMenu, renderMenu } = useMenu()
  const onAction = async (actionFunc) => {
    await actionFunc(item._id)
    refetchData()
  }

  const tableCells = columns.map(
    ({ field, calculatedCellValue, filterEnum }) => {
      let propValue = ''
      if (calculatedCellValue) {
        propValue = calculatedCellValue(item)
      } else {
        propValue = (filterEnum ? item[field][role] : item[field]).toString()
      }
      return <TableCell key={field}>{propValue}</TableCell>
    }
  )

  const menuItems = rowActions.map(({ label, func }) => (
    <MenuItem key={label} onClick={() => onAction(func)}>
      {label}
    </MenuItem>
  ))

  return (
    <TableRow hover key={item._id} selected={isItemSelected}>
      {isSelection && (
        <TableCell padding='checkbox'>
          <Checkbox
            checked={isItemSelected}
            color='primary'
            onChange={(e) => handleSelectClick(e, item._id)}
          />
        </TableCell>
      )}
      {tableCells}
      {isSelection && (
        <TableCell>
          <IconButton data-testid='menu-icon' onClick={openMenu}>
            <MoreVertIcon
              color='primary'
              sx={{
                fontSize: '20px'
              }}
            />
          </IconButton>
          {renderMenu(menuItems)}
        </TableCell>
      )}
    </TableRow>
  )
}

export default EnhancedTableRow
