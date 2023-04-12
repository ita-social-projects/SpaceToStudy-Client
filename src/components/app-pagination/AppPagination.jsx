import Pagination from '@mui/material/Pagination'
import Box from '@mui/system/Box'
import { styles } from '~/components/app-pagination/AppPagination.styles'

const AppPagination = ({
  size = 'medium',
  page,
  itemsCount,
  pageSize,
  setCurrentPage
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)

  const handlePageChange = (event, page) => {
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
