import { useEffect, useState } from 'react'

const useShowMore = (allItems, start, step) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [startCount] = useState(start)
  const [addCount] = useState(step)
  const [items, setItems] = useState([])

  const totalPages = allItems.length > startCount ? Math.ceil((allItems.length - startCount) / addCount) : 0
  const expandable = currentPage < totalPages

  useEffect(() => {
    const limit = startCount + addCount * currentPage
    setItems(allItems.slice(0, limit))
    setCurrentPage((prevState) => prevState)
  }, [allItems, startCount, addCount, currentPage])

  const showMore = () => {
    setCurrentPage((prevState) => prevState + 1)
  }

  return { items, expandable, showMore }
}

export default useShowMore
