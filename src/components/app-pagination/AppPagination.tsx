import { ChangeEvent, FC } from 'react'

import Pagination from '@mui/material/Pagination'
import Box from '@mui/system/Box'

import { Size } from '~/types'
import { styles } from '~/components/app-pagination/AppPagination.styles'

interface AppPaginationProps {
  size?: Size
  page: number
  itemsCount: number
  pageSize: number
  setCurrentPage: (page: number) => void
}

const AppPagination: FC<AppPaginationProps> = ({
  size = Size.Medium,
  page,
  itemsCount,
  pageSize,
  setCurrentPage
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <Box sx={styles.wrapper}>
      <Pagination
        count={pageCount}
        defaultPage={1}
        onChange={handlePageChange}
        page={page}
        size={size}
      />
    </Box>
  )
}

export default AppPagination
