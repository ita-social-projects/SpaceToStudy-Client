import { useTableContext } from '~/context/table-context'

const useSort = () => {
  const { sort, setSort } = useTableContext()

  const onRequestSort = (_e, property) => {
    const isAsc = sort.orderBy === property && sort.order === 'asc'
    setSort({ order: isAsc ? 'desc' : 'asc', orderBy: property })
  }

  return { onRequestSort, sort }
}

export default useSort
