import { ChangeEvent, FC } from 'react'

import Pagination, { PaginationProps } from '@mui/material/Pagination'
import Box from '@mui/system/Box'

import { SizeEnums } from '~/types'
import { styles } from '~/components/app-pagination/AppPagination.styles'

interface AppPaginationProps
  extends Omit<PaginationProps, 'page' | 'onChange'> {
  size?: SizeEnums
  itemsCount: number
  itemsPerPage: number
  onChange: (page: number) => void
}

const AppPagination: FC<AppPaginationProps> = ({
  size = SizeEnums.Medium,
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
        size={size}
        {...props}
      />
    </Box>
  )
}

export default AppPagination
