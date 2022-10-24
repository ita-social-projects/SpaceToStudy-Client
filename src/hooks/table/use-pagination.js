import { useTableContext } from '~/context/table-context'

const usePagination = () => {
  const { setPage, setRowsPerPage, setPageInput, pageInput } = useTableContext()

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

  const clearPage = () => setPage(0)

  return {
    clearPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePageSubmit,
    handleChangePageInput,
    handleChangePaginationController
  }
}

export default usePagination
