import { ChangeEvent, useCallback, useMemo, useState } from 'react'

const usePagination = ({
  defaultPage = 1,
  itemsPerPage = 5,
  itemsCount = 10
} = {}) => {
  const pageCount = useMemo(
    () => Math.ceil(itemsCount / itemsPerPage),
    [itemsCount, itemsPerPage]
  )
  const checkedPage = useMemo(() => {
    if (isNaN(defaultPage) || defaultPage < 1) {
      return 1
    }
    return defaultPage
  }, [defaultPage])

  const [page, setPage] = useState<number>(checkedPage)
  const [rowsPerPage, setRowsPerPage] = useState<number>(itemsPerPage)
  const [pageInput, setPageInput] = useState<number | string>(1)

  const handleChangePage = (_e: ChangeEvent<unknown>, newPage: number) => {
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

  const clearPage = useCallback(() => setPage(1), [setPage])

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    pageInput,
    setPageInput,
    pageCount,
    itemsCount,
    clearPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handlePageSubmit,
    handleChangePageInput
  }
}

export default usePagination
