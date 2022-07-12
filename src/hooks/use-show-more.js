import { useEffect, useState } from 'react'

const useShowMore = (allItems, start, step) => {
  const totalPages = allItems.length > start ? Math.ceil((allItems.length - start) / step) : 0
  const [items, setItems] = useState(allItems.slice(0, start))
  const [currentPage, setCurrentPage] = useState(1)
  const expandable = currentPage <= totalPages

  useEffect(() => {
    setItems(allItems.slice(0, start))
    setCurrentPage(1)
  }, [allItems, start, step])

  const showMore = () => {
    const limit = start + step * currentPage
    setItems(allItems.slice(0, limit))
    setCurrentPage((prevState) => prevState + 1)
  }

  return { items, expandable, showMore }
}

export default useShowMore
