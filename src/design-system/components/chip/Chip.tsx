import React from 'react'
import {
  ChipProps,
  FilterChip,
  InputChip,
  CategoryChip,
  StateChip
} from './ChipTypes'

const Chip: React.FC<ChipProps> = (props) => {
  switch (props.type) {
    case 'filter':
      return <FilterChip {...props} />
    case 'input':
      return <InputChip {...props} />
    case 'category':
      return <CategoryChip {...props} />
    case 'state':
      return <StateChip {...props} />
    default:
      return null
  }
}

export default Chip
