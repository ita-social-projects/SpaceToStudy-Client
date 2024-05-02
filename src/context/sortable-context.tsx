import { createContext, useContext, useMemo, ReactNode } from 'react'
import { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'

interface SortableItemProviderProps {
  children: ReactNode
  id: string
}

interface SortableItemProvideContext {
  attributes: DraggableAttributes
  listeners: DraggableSyntheticListeners
  ref: (node: HTMLElement | null) => void
}

const SortableItemContext = createContext<SortableItemProvideContext>({
  attributes: {
    role: 'button',
    tabIndex: 0,
    'aria-disabled': false,
    'aria-pressed': false,
    'aria-roledescription': '',
    'aria-describedby': ''
  },
  listeners: undefined,
  ref() {}
})

const SortableItemProvider = ({ children, id }: SortableItemProviderProps) => {
  const { attributes, listeners, setActivatorNodeRef } = useSortable({
    id
  })

  const contextValue = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  )
  return (
    <SortableItemContext.Provider value={contextValue}>
      {children}
    </SortableItemContext.Provider>
  )
}

const useSortableItemContext = () => useContext(SortableItemContext)

export { SortableItemProvider, useSortableItemContext }
