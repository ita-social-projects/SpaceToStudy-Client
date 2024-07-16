import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { TableProps } from '@mui/material/Table'
import useMenu from '~/hooks/use-menu'

import { styles } from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow.styles'
import {
  TableActionFunc,
  TableColumn,
  TableItem,
  TableRowAction,
  TableSelect
} from '~/types'

export interface EnhancedTableRowProps<I> extends Omit<TableProps, 'style'> {
  columns: TableColumn<I>[]
  isSelection?: boolean
  item: I
  onRowClick?: (item: I) => void
  refetchData?: () => void
  rowActions?: TableRowAction[]
  select?: TableSelect<I>
  selectedRows: I[]
}

const EnhancedTableRow = <I extends TableItem>({
  columns,
  isSelection,
  item,
  refetchData,
  rowActions,
  onRowClick,
  select = {} as TableSelect<I>,
  selectedRows
}: EnhancedTableRowProps<I>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { isSelected, handleSelectClick } = select

  const onAction = async (actionFunc: TableActionFunc) => {
    closeMenu()
    await actionFunc(item._id)
    refetchData && refetchData()
  }

  const additionalProps = { t, navigate }

  const tableCells = columns.map(({ field, label, calculatedCellValue }) => {
    let propValue: string | ReactNode
    if (calculatedCellValue) {
      propValue = calculatedCellValue(item, additionalProps)
    } else {
      propValue = item[field as keyof I]?.toString()
    }

    return <TableCell key={label}>{propValue}</TableCell>
  })

  const menuItems = rowActions?.map(({ label, func }) => (
    <MenuItem key={label} onClick={() => void onAction(func)}>
      {label}
    </MenuItem>
  ))

  const handleRowClick = () => (onRowClick ? onRowClick(item) : null)

  const isRowSelected =
    onRowClick &&
    selectedRows.length &&
    selectedRows.find((row) => row._id === item._id)

  return (
    <TableRow
      hover
      key={item._id}
      onClick={handleRowClick}
      selected={isSelection && isSelected(item._id)}
      sx={styles.row(!!isRowSelected, !!onRowClick)}
    >
      {isSelection && (
        <TableCell padding='checkbox'>
          <Checkbox
            checked={isSelected(item._id)}
            color='primary'
            onChange={() => handleSelectClick(item._id)}
          />
        </TableCell>
      )}
      {tableCells}
      {rowActions && (
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
