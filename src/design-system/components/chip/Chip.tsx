import {
  ChipProps,
  FilterChip,
  InputChip,
  CategoryChip,
  StateChip
} from './ChipTypes'

const Chip: React.FC<ChipProps> = (props) => {
  switch (props.type) {
    case 'filter': {
      const { isOpen, selectedOption, setIsOpen, onSelectChange } =
        props as ChipProps & {
          isOpen: boolean
          selectedOption: string | null
          setIsOpen: (isOpen: boolean) => void
          onSelectChange: (option: string) => void
        }

      const handleSelectChange = (option: string) => {
        onSelectChange(option)
      }

      return (
        <FilterChip
          {...props}
          isOpen={isOpen}
          onSelectChange={handleSelectChange}
          selectedOption={selectedOption}
          setIsOpen={setIsOpen}
        />
      )
    }
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
