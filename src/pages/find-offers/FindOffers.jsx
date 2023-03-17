import { useState } from 'react'
import useBreakpoints from '~/hooks/use-breakpoints'
import AppPagination from '~/components/app-pagination/AppPagination'

const FindOffers = () => {
  const { isMobile } = useBreakpoints()
  const size = isMobile ? 'small' : 'medium'
  const [currentPage, setCurrentPage] = useState(1)

  const mockDataPagination = {
    itemsCount: 100,
    page: currentPage,
    pageSize: 5
  }

  return (
    <div>
      FindOffers Page Placeholder
      <AppPagination
        itemsCount={mockDataPagination.itemsCount}
        page={mockDataPagination.page}
        pageSize={mockDataPagination.pageSize}
        setCurrentPage={setCurrentPage}
        size={size}
      />
    </div>
  )
}

export default FindOffers
