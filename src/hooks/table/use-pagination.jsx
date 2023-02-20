import { useCallback } from 'react'
import { useTableContext } from '~/context/table-context'

const usePagination = () => {
  const { page, rowsPerPage, pageInput, setPage, setRowsPerPage, setPageInput } = useTableContext()

  const handleChangePage = (_e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
  }

  const handlePageSubmit = (maxPages) => {
    if (pageInput > maxPages) {
      setPageInput(maxPages)
      return setPage(maxPages - 1)
    }
    if (pageInput < 1) {
      setPageInput(1)
      return setPage(0)
    }
    setPage(pageInput - 1)
  }

  const handleChangePageInput = (e) => {
    setPageInput(e.target.value)
  }

  const handleChangePaginationController = (_e, page) => {
    setPage(page - 1)
  }

  const clearPage = useCallback(() => setPage(0), [setPage])

  return {
    page,
    rowsPerPage,
    pageInput,
    clearPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePageSubmit,
    handleChangePageInput,
    handleChangePaginationController
  }
}

export default usePagination
