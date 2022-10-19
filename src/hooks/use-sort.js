import { useState } from 'react'

const useSort = (initialSort) => {
  const [sort, setSort] = useState(initialSort)

  const onRequestSort = (_e, property) => {
    const isAsc = sort.orderBy === property && sort.order === 'asc'
    setSort({ order: isAsc ? 'desc' : 'asc', orderBy: property })
  }

  return { sort, onRequestSort }
}

export default useSort
