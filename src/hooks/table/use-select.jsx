import { useCallback, useState } from 'react'

const useSelect = ({ initialSelect = [] }) => {
  const [selected, setSelected] = useState(initialSelect)

  const clearSelected = useCallback(() => setSelected([]), [setSelected])

  const handleSelectAllClick = (e, items) => {
    if (e.target.checked) {
      const newSelected = items.map((item) => item._id)
      return setSelected(newSelected)
    }
    clearSelected()
  }

  const createSelectAllHandler = (items) => (e) =>
    handleSelectAllClick(e, items)

  const handleSelectClick = (_e, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id)
    }

    setSelected(newSelected)
  }

  const isSelected = (id) => selected.includes(id)

  return {
    selected,
    isSelected,
    clearSelected,
    createSelectAllHandler,
    handleSelectClick
  }
}

export default useSelect
