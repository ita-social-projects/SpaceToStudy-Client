import { forwardRef } from 'react'
import {
  CategoryChip,
  FilterChip,
  InputChip,
  StateChip
} from './ChipInternalComponents'
import { type ChipProps } from './types'

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, reference) => {
  switch (props.type) {
    case 'filter': {
      return <FilterChip {...props} ref={reference} />
    }

    case 'input': {
      return <InputChip {...props} ref={reference} />
    }

    case 'category': {
      return <CategoryChip {...props} ref={reference} />
    }

    case 'state': {
      return <StateChip {...props} ref={reference} />
    }

    default: {
      return null
    }
  }
})

Chip.displayName = 'Chip'

export default Chip

export { type ChipColor } from './types'
