import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { TableContext } from '~/context/table-context'

import { styles } from './EnhancedTablePagination.styles'

const EnhancedTablePagination = ({ itemsCount }) => {
  const { t } = useTranslation()
  const {
    page,
    pageInput,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangePageInput,
    handlePageSubmit,
    handleChangePaginationController
  } = useContext(TableContext)

  const maxPages = Math.ceil(itemsCount / rowsPerPage)

  const PaginationController = (currentPage, maxPages) => {
    return (
      <Box
        sx={ {
          flexShrink: 0
        } }
      >
        <Pagination count={ maxPages } onChange={ handleChangePaginationController } page={ currentPage + 1 } />
      </Box>
    )
  }

  const getDisplayedRowsLabel = (from, to, count) => `${from}-${to} ${t('table.of')} ${count}`

  return (
    <Box sx={ styles.root }>
      <TablePagination
        ActionsComponent={ () => PaginationController(page, maxPages) }
        component='div'
        count={ itemsCount }
        labelDisplayedRows={ ({ from, to, count }) => getDisplayedRowsLabel(from, to, count) }
        labelRowsPerPage={ t('table.numberOfRows') }
        onPageChange={ handleChangePage }
        onRowsPerPageChange={ handleChangeRowsPerPage }
        page={ page }
        rowsPerPage={ rowsPerPage }
        rowsPerPageOptions={ [5, 10, 25, 50] }
        sx={ styles.tablePagination }
      />
      <Box sx={ styles.pageInputBox }>
        <Typography variant='subtitle2'>
          { t('table.goToPage') }
        </Typography>
        <TextField
          onChange={ handleChangePageInput }
          size='small'
          sx={ styles.pageInput }
          type='number'
          value={ pageInput }
        />
        <Button onClick={ () => handlePageSubmit(maxPages) } sx={ styles.btn } variant='outlined'>
          { t('table.go') }
        </Button>
      </Box>
    </Box>
  )
}

export default EnhancedTablePagination
