import { FC } from 'react'

import Pagination, { PaginationProps } from '@mui/material/Pagination'
import Box from '@mui/system/Box'
import { SxProps } from '@mui/material'

import { styles } from '~/components/app-pagination/AppPagination.styles'

interface AppPaginationProps extends Omit<PaginationProps, 'count'> {
  pageCount: number
  sx?: SxProps
}

const AppPagination: FC<AppPaginationProps> = ({
  pageCount,
  page,
  sx,
  ...props
}) => {
  return pageCount > 1 ? (
    <Box sx={{ ...styles.wrapper, ...sx }}>
      <Pagination
        count={pageCount}
        defaultPage={1}
        page={Number(page)}
        {...props}
      />
    </Box>
  ) : null
}

export default AppPagination
