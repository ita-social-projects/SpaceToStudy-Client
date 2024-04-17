import { useCallback, useState, MouseEvent, ChangeEvent } from 'react'

interface Item {
  _id: string
}

interface SelectHook {
  selected: string[]
  isSelected: (id: string) => boolean
  clearSelected: () => void
  createSelectAllHandler: (
    items: Item[]
  ) => (e: ChangeEvent<HTMLInputElement>) => void
  handleSelectClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void
}

const useSelect = ({
  initialSelect = []
}: {
  initialSelect?: string[]
}): SelectHook => {
  const [selected, setSelected] = useState<string[]>(initialSelect)

  const clearSelected = useCallback(() => setSelected([]), [setSelected])

  const handleSelectAllClick = (
    e: ChangeEvent<HTMLInputElement>,
    items: Item[]
  ) => {
    if (e.target.checked) {
      const newSelected = items.map((item) => item._id)
      return setSelected(newSelected)
    }
    clearSelected()
  }

  const createSelectAllHandler =
    (items: Item[]) => (e: ChangeEvent<HTMLInputElement>) =>
      handleSelectAllClick(e, items)

  const handleSelectClick = (_e: MouseEvent<HTMLButtonElement>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id)
    }

    setSelected(newSelected)
  }

  const isSelected = (id: string) => selected.includes(id)

  return {
    selected,
    isSelected,
    clearSelected,
    createSelectAllHandler,
    handleSelectClick
  }
}

export default useSelect
