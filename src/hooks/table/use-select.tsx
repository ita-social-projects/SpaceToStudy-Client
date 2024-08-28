import { useCallback, useState, ChangeEvent } from 'react'

interface Item {
  _id: string
}

interface UseSelectInput {
  initialSelect?: string[]
}

interface UseSelectOutput {
  selected: string[]
  isSelected: (id: string) => boolean
  clearSelected: () => void
  createSelectAllHandler: (
    items: Item[]
  ) => (e: ChangeEvent<HTMLInputElement>) => void
  handleSelectClick: (id: string) => void
  setSelected: (ids: string[]) => void
}

const useSelect = ({ initialSelect = [] }: UseSelectInput): UseSelectOutput => {
  const [selected, setSelected] = useState<string[]>(initialSelect)

  const clearSelected = useCallback(() => setSelected([]), [setSelected])

  const handleSelectAllClick = (
    e: ChangeEvent<HTMLInputElement>,
    items: Item[]
  ) => {
    if (e.target.checked) {
      const newSelected = items.map((item) => item._id)
      setSelected(newSelected)
      return
    }
    clearSelected()
  }

  const createSelectAllHandler =
    (items: Item[]) => (e: ChangeEvent<HTMLInputElement>) =>
      handleSelectAllClick(e, items)

  const handleSelectClick = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((selectedId) => selectedId !== id)
      : [...selected, id]

    setSelected(newSelected)
  }

  const isSelected = (id: string) => selected.includes(id)

  return {
    selected,
    isSelected,
    clearSelected,
    createSelectAllHandler,
    handleSelectClick,
    setSelected
  }
}

export default useSelect
