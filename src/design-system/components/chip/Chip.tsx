import {
  CategoryChip,
  FilterChip,
  InputChip,
  StateChip
} from './ChipInternalComponents'
import { type ChipProps } from './types'

const Chip: React.FC<ChipProps> = (props) => {
  switch (props.type) {
    case 'filter': {
      return <FilterChip {...props} />
    }

    case 'input': {
      return <InputChip {...props} />
    }

    case 'category': {
      return <CategoryChip {...props} />
    }

    case 'state': {
      return <StateChip {...props} />
    }

    default: {
      return null
    }
  }
}

export default Chip
