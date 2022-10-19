import { useTableContext } from '~/context/table-context'

const useSelect = () => {
  const { selected, setSelected } = useTableContext()

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

  const clearSelected = () => setSelected([])

  return { isSelected, clearSelected, createSelectAllHandler, handleSelectClick }
}

export default useSelect
