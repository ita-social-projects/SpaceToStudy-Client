import React, { useState } from 'react'
import {
  ChipProps,
  FilterChip,
  InputChip,
  CategoryChip,
  StateChip
} from './ChipTypes'

const Chip: React.FC<ChipProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelectChange = (option: string) => {
    setSelectedOption(option)
  }

  switch (props.type) {
    case 'filter':
      return (
        <FilterChip
          {...props}
          isOpen={isOpen}
          onSelectChange={handleSelectChange}
          selectedOption={selectedOption}
          setIsOpen={setIsOpen}
        />
      )
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
