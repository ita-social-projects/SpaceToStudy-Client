import React, { CSSProperties, useState } from 'react'
import { cn } from '~/utils/cn'
// import classNames from 'classnames'
import CircleIcon from '@mui/icons-material/Circle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import './Chip.scss'

type ChipContentProps = {
  label: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

type ChipType = 'filter' | 'input' | 'category' | 'state'

type BaseChipProps = ChipContentProps & {
  type: ChipType
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

type FilterChipProps = BaseChipProps & {
  type: 'filter'
  options: string[]
  variant?: 'filled' | 'minimal'
}

type InputChipProps = BaseChipProps & {
  type: 'input'
  variant?: 'filled' | 'outlined' | 'filled-outlined'
}

type ChipColor =
  | 'blue-gray'
  | 'turquoise'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'red'
  | 'neutral'

type CategoryChipProps = BaseChipProps & {
  type: 'category'
  detail: string
  color?: ChipColor
}

type StateChipProps = BaseChipProps & {
  type: 'state'
  color?: ChipColor
}

export type ChipProps =
  | FilterChipProps
  | InputChipProps
  | CategoryChipProps
  | StateChipProps

type CustomStyle = CSSProperties & {
  [key: `--chip-${string}`]: string | undefined
}

const ChipContent: React.FC<ChipContentProps> = ({
  label,
  startIcon,
  endIcon
}) => (
  <>
    {startIcon && <span className='startIcon'>{startIcon}</span>}
    <span className='label'>{label}</span>
    {endIcon && <span className='endIcon'>{endIcon}</span>}
  </>
)

const FilterChip: React.FC<FilterChipProps> = ({
  type,
  label,
  options = [],
  variant = 'filled',
  startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
  endIcon = <ExpandMoreIcon style={{ fontSize: 'inherit' }} />,
  disabled = false,
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const isSelected = Boolean(selectedOption)

  const classes = cn(
    'chip',
    `chip--${size}`,
    `chip--${type}`,
    variant,
    isSelected ? 'selected' : 'unselected',
    {
      disabled
    }
  )
  return (
    <div
      className={classes}
      onClick={() => !disabled && setIsOpen((prev) => !prev)}
      role='button'
    >
      <ChipContent
        endIcon={endIcon}
        label={selectedOption || label}
        startIcon={startIcon}
      />
      {isOpen && (
        <ul className='dropdown-menu'>
          {options.map((option) => (
            <li
              className='dropdown-item'
              key={option}
              onClick={() => {
                handleSelect(option)
                setIsOpen((prev) => !prev)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const InputChip: React.FC<InputChipProps> = ({
  type,
  label,
  variant = 'outlined',
  startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
  endIcon = <CloseRoundedIcon style={{ fontSize: 'inherit' }} />,
  disabled = false,
  size = 'md'
}) => {
  const classes = cn('chip', `chip--${size}`, `chip--${type}`, variant, {
    disabled
  })
  return (
    <div className={classes}>
      <ChipContent endIcon={endIcon} label={label} startIcon={startIcon} />
    </div>
  )
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  type,
  label,
  detail,
  size = 'md',
  color = 'blue-gray',
  disabled = false
}) => {
  const labelStyle: CustomStyle = {
    '--chip-text-color': `var(--s2s-${color}-900)`,
    '--chip-bg-color': `var(--s2s-${color}-300)`
  }

  const detailStyle: CustomStyle = {
    '--chip-text-color': `var(--s2s-${color}-900)`,
    '--chip-bg-color': `var(--s2s-${color}-100)`
  }

  return (
    <div className='chip--categories'>
      <div
        className={cn('chip', `chip--${size}`, `chip--${type}`, {
          disabled
        })}
        style={labelStyle}
      >
        <ChipContent label={label} />
      </div>
      <div
        className={cn('chip', `chip--${size}`, `chip--${type}`, {
          disabled
        })}
        style={detailStyle}
      >
        <ChipContent label={detail} />
      </div>
    </div>
  )
}

const StateChip: React.FC<StateChipProps> = ({
  type,
  label,
  startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
  size = 'md',
  color = 'blue-gray',
  disabled = false
}) => {
  const style: CustomStyle = {
    '--chip-bg-color': `var(--s2s-${color}-100)`,
    '--chip-text-color': `var(--s2s-${color}-700)`,
    '--chip-border-color': `var(--s2s-${color}-700)`
  }
  return (
    <div
      className={cn('chip', `chip--${size}`, `chip--${type}`, {
        disabled
      })}
      style={style}
    >
      <ChipContent label={label} startIcon={startIcon} />
    </div>
  )
}

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
