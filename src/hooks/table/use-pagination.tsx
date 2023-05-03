import { ChangeEvent, useCallback, useMemo, useState } from 'react'

const usePagination = ({
  defaultPage = 1,
  itemsPerPage = 5,
  itemsCount = 10
} = {}) => {
  const pageCount = Math.ceil(itemsCount / itemsPerPage)
  const checkedPage = useMemo(() => {
    if (isNaN(defaultPage) || defaultPage < 1) {
      return 1
    }
    if (defaultPage > pageCount) {
      return pageCount
    }
    return defaultPage
  }, [defaultPage, pageCount])

  const [page, setPage] = useState<number>(checkedPage)
  const [rowsPerPage, setRowsPerPage] = useState<number>(itemsPerPage)
  const [pageInput, setPageInput] = useState<number | string>(1)

  const handleChangePage = (_e: ChangeEvent, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value))
  }

  const handlePageSubmit = (maxPages: number) => {
    if (Number(pageInput) > maxPages) {
      setPageInput(maxPages)
      return setPage(maxPages)
    }
    if (Number(pageInput) < 1) {
      setPageInput(1)
      return setPage(1)
    }
    setPage(Number(pageInput))
  }

  const handleChangePageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value)
  }

  const handleChangePaginationController = (
    _e: ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page)
  }

  const clearPage = useCallback(() => setPage(1), [setPage])

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    pageInput,
    setPageInput,
    pageCount,
    clearPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePageSubmit,
    handleChangePageInput,
    handleChangePaginationController
  }
}

export default usePagination
