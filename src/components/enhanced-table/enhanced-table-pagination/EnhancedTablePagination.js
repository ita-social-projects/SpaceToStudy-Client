import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { styles } from './EnhancedTablePagination.styles'

const EnhancedTablePagination = ({ page, rowsPerPage, itemsCount, setCurrentPage, setRowsPerPage }) => {
  const { t } = useTranslation()
  const [pageInput, setPageInput] = useState(1)

  const maxPages = Math.ceil(itemsCount / rowsPerPage)

  const handleSubmit = () => {
    if (pageInput > maxPages) {
      setPageInput(maxPages)
      return setCurrentPage(maxPages - 1)
    }
    if (pageInput < 1) {
      setPageInput(1)
      return setCurrentPage(0)
    }
    setCurrentPage(pageInput - 1)
  }

  const PaginationController = (currentPage, maxPages) => {
    return (
      <Box
        sx={ {
          flexShrink: 0
        } }
      >
        <Pagination
          count={ maxPages }
          onChange={ (_e, page) => {
            setCurrentPage(page - 1)
          } }
          page={ currentPage + 1 }
        />
      </Box>
    )
  }

  const handleChangePage = (_e, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangePageInput = (e) => {
    setPageInput(e.target.value)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
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
        <Button onClick={ handleSubmit } sx={ styles.btn } variant='outlined'>
          { t('table.go') }
        </Button>
      </Box>
    </Box>
  )
}

export default EnhancedTablePagination
