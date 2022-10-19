import { useState } from 'react'

const useSelect = () => {
  const [selected, setSelected] = useState([])

  const numSelected = selected.length

  const handleSelectAllClick = (e, items) => {
    if (e.target.checked) {
      const newSelected = items.map((item) => item._id)
      return setSelected(newSelected)
    }
    setSelected([])
  }

  const createSelectAllHandler = (items) => (e) => handleSelectAllClick(e, items)

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

  return { selected, setSelected, isSelected, numSelected, createSelectAllHandler, handleSelectClick }
}

export default useSelect
