import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import useMenu from '~/hooks/use-menu'

const EnhancedTableRow = ({
  columns,
  isSelection,
  item,
  refetchData,
  rowActions,
  select
}) => {
  const { openMenu, renderMenu } = useMenu()
  const { isSelected, handleSelectClick } = select

  const onAction = async (actionFunc) => {
    await actionFunc(item._id)
    refetchData()
  }

  const tableCells = columns.map(({ field, calculatedCellValue }) => {
    let propValue = ''
    if (calculatedCellValue) {
      propValue = calculatedCellValue(item)
    } else {
      propValue = item[field].toString()
    }
    return <TableCell key={field}>{propValue}</TableCell>
  })

  const menuItems = rowActions.map(({ label, func }) => (
    <MenuItem key={label} onClick={() => onAction(func)}>
      {label}
    </MenuItem>
  ))

  return (
    <TableRow hover key={item._id} selected={isSelected(item._id)}>
      {isSelection && (
        <TableCell padding='checkbox'>
          <Checkbox
            checked={isSelected(item._id)}
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
