import { useEffect, useMemo, useState } from 'react'

const useShowMore = (allItems, itemsToShow, itemsToAdd) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [items, setItems] = useState([])

  const totalPages = useMemo(() => {
    return allItems.length > itemsToShow ? Math.ceil((allItems.length - itemsToShow) / itemsToAdd) : 0
  }, [allItems, itemsToShow, itemsToAdd])

  const isExpandable = currentPage < totalPages

  useEffect(() => {
    const limit = itemsToShow + itemsToAdd * currentPage
    setItems(allItems.slice(0, limit))
  }, [allItems, itemsToShow, itemsToAdd, currentPage])

  const showMore = () => {
    setCurrentPage((prevState) => prevState + 1)
  }

  return { items, isExpandable, showMore }
}

export default useShowMore
