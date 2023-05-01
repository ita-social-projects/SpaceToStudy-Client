import { ChangeEvent, FC } from 'react'

import Pagination, { PaginationProps } from '@mui/material/Pagination'
import Box from '@mui/system/Box'

import { styles } from '~/components/app-pagination/AppPagination.styles'

interface AppPaginationProps
  extends Omit<PaginationProps, 'count' | 'onChange'> {
  itemsCount: number
  itemsPerPage: number
  onChange: (page: number) => void
}

const AppPagination: FC<AppPaginationProps> = ({
  itemsCount,
  itemsPerPage,
  onChange,
  ...props
}) => {
  const pageCount = Math.ceil(itemsCount / itemsPerPage)

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    onChange(page)
  }

  return (
    <Box sx={styles.wrapper}>
      <Pagination
        count={pageCount}
        defaultPage={1}
        onChange={handlePageChange}
        {...props}
      />
    </Box>
  )
}

export default AppPagination
