import { useState } from 'react'

type AccordionState = number[] | null | number

type RetunedValue<T extends boolean> = T extends true ? number[] : null | number

interface Options<T extends boolean = false> {
  multiple?: T
  toggle?: boolean
  initialState?: AccordionState
}

const defaultOptions = {
  toggle: true,
  initialState: null
}

function useAccordions<T extends boolean = false>({
  multiple,
  initialState = null,
  toggle = true
}: Options<T> = defaultOptions) {
  const [expanded, setExpanded] = useState<AccordionState>(initialState)

  const handleChange = (value: number) => {
    setExpanded((prev) => {
      if (multiple && Array.isArray(prev)) {
        const isItemAlreadyActive = prev.includes(value)
        return isItemAlreadyActive
          ? prev.filter((index) => index !== value)
          : [...prev, value]
      } else {
        const shouldToggleCurrentlyActive = prev === value && toggle
        return shouldToggleCurrentlyActive ? null : value
      }
    })
  }

  return [expanded as RetunedValue<T>, handleChange] as const
}

export default useAccordions
