import { FC } from 'react'

import Pagination, { PaginationProps } from '@mui/material/Pagination'
import Box from '@mui/system/Box'

import { styles } from '~/components/app-pagination/AppPagination.styles'

interface AppPaginationProps extends Omit<PaginationProps, 'count'> {
  pageCount: number
}

const AppPagination: FC<AppPaginationProps> = ({
  pageCount,
  page,
  ...props
}) => {
  return (
    <Box sx={styles.wrapper}>
      <Pagination
        count={pageCount}
        defaultPage={1}
        page={Number(page)}
        {...props}
      />
    </Box>
  )
}

export default AppPagination
