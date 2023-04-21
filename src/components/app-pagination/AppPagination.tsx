import { ChangeEvent, FC } from 'react'

import Pagination from '@mui/material/Pagination'
import Box from '@mui/system/Box'

import { SizeEnums } from '~/types'
import { styles } from '~/components/app-pagination/AppPagination.styles'

interface AppPaginationProps {
  size?: SizeEnums
  page: number
  itemsCount: number
  itemsPerPage: number
  setCurrentPage: (page: number) => void
}

const AppPagination: FC<AppPaginationProps> = ({
  size = SizeEnums.Medium,
  page,
  itemsCount,
  itemsPerPage,
  setCurrentPage
}) => {
  const pageCount = Math.ceil(itemsCount / itemsPerPage)

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
