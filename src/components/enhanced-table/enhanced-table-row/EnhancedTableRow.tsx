import { ReactNode, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Checkbox from '@mui/material/Checkbox'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { styles } from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow.styles'
import useMenu from '~/hooks/use-menu'
import {
  TableActionFunc,
  TableColumn,
  TableItem,
  TableRowAction,
  TableSelect
} from '~/types'

export interface EnhancedTableRowProps<I> {
  columns: TableColumn<I>[]
  isSelection?: boolean
  isDisableRow?: boolean
  item: I
  onRowClick?: (item: I) => void
  refetchData?: () => void
  rowActions?: TableRowAction[]
  select?: TableSelect<I>
  selectedRows: I[]
  initialSelectedRows?: I[]
}

interface AdditionalProps {
  t: ReturnType<typeof useTranslation>['t']
  navigate: ReturnType<typeof useNavigate>
}

const EnhancedTableRow = <I extends TableItem>({
  columns,
  isSelection,
  isDisableRow = false,
  item,
  onRowClick,
  refetchData,
  rowActions,
  select = {} as TableSelect<I>,
  selectedRows,
  initialSelectedRows = []
}: EnhancedTableRowProps<I>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { isSelected, handleSelectClick } = select

  const onAction = useCallback(
    async (actionFunc: TableActionFunc) => {
      closeMenu()
      await actionFunc(item._id)
      refetchData && refetchData()
    },
    [closeMenu, item._id, refetchData]
  )

  const additionalProps = useMemo(() => ({ t, navigate }), [t, navigate])

  const renderTableCell = useCallback(
    (
      field: keyof I,
      label: string,
      calculatedCellValue?: (item: I, props: AdditionalProps) => ReactNode
    ) => {
      const propValue = calculatedCellValue
        ? calculatedCellValue(item, additionalProps)
        : item[field]?.toString()
      return <TableCell key={label}>{propValue}</TableCell>
    },
    [additionalProps, item]
  )

  const tableCells = useMemo(
    () =>
      columns.map(({ field, label, calculatedCellValue }) =>
        renderTableCell(field as keyof I, label, calculatedCellValue)
      ),
    [columns, renderTableCell]
  )

  const menuItems = useMemo(
    () =>
      rowActions?.map(({ label, func }) => (
        <MenuItem key={label} onClick={() => void onAction(func)}>
          {label}
        </MenuItem>
      )),
    [rowActions, onAction]
  )

  const handleRowClick = () => onRowClick && onRowClick(item)

  const isRowSelected = !!(
    onRowClick && selectedRows.find((row) => row._id === item._id)
  )

  const isInitialSelected =
    isDisableRow && !!initialSelectedRows?.find((row) => row._id === item._id)

  return (
    <TableRow
      hover
      key={item._id}
      onClick={handleRowClick}
      selected={isSelection && isSelected(item._id)}
      sx={styles.row(isRowSelected, !!onRowClick, isInitialSelected)}
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
