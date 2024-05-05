import { useState, useCallback, useMemo } from 'react'
import {
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragStartEvent,
  DragEndEvent,
  Active
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

type ObjectWithId = { id?: string | number; _id?: string | number }

interface UseDndSensorProps<T extends ObjectWithId> {
  items: T[]
  setItems: (items: T[]) => void
  idProp: 'id' | '_id'
}

const useDndSensor = <T extends ObjectWithId>({
  items,
  setItems,
  idProp
}: UseDndSensorProps<T>) => {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item[idProp] === active?.id),
    [active, items, idProp]
  )

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (active && over) {
        const activeIndex = items.findIndex(
          (item) => item[idProp] && item[idProp] === active.id
        )
        const overIndex = items.findIndex(
          (item) => item[idProp] && item[idProp] === over.id
        )
        if (activeIndex !== -1 && overIndex !== -1) {
          setItems(arrayMove(items, activeIndex, overIndex))
        }
      }
    },
    [setItems, items, idProp]
  )

  const handleDragCancel = () => setActive(null)

  const handleDragStart = ({ active }: DragStartEvent) => setActive(active)

  return {
    activeItem,
    sensors,
    handleDragEnd,
    handleDragCancel,
    handleDragStart
  }
}

export default useDndSensor
