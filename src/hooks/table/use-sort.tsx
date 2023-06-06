import { useCallback, useState } from 'react'
import { Sort, SortEnum } from '~/types'

interface UseSortProps {
  initialSort: Sort
}

export interface SortHook {
  sort: Sort
  onRequestSort: (property: string) => void
  resetSort: () => void
}

const useSort = ({ initialSort }: UseSortProps): SortHook => {
  const [sort, setSort] = useState<Sort>(initialSort)

  const onRequestSort = useCallback(
    (property: string) => {
      const [orderBy, order] = property.split(' ')
      if (order) {
        setSort({ order: order as SortEnum, orderBy })
      } else {
        const isAsc = sort.orderBy === orderBy && sort.order === SortEnum.Asc
        setSort({
          order: isAsc ? SortEnum.Desc : SortEnum.Asc,
          orderBy
        })
      }
    },
    [sort]
  )

  const resetSort = useCallback(() => setSort(initialSort), [initialSort])

  return { onRequestSort, resetSort, sort }
}

export default useSort
