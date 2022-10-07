import { useState } from 'react'

const usePagination = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [pageInput, setPageInput] = useState(1)

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

  return {
    page,
    setPage,
    pageInput,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePageSubmit,
    handleChangePageInput,
    handleChangePaginationController
  }
}

export default usePagination
