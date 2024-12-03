import React, { CSSProperties } from 'react'
import { cn } from '~/utils/cn'
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
    {startIcon && <span className='s2s-startIcon'>{startIcon}</span>}
    <span className='s2s-label'>{label}</span>
    {endIcon && <span className='s2s-endIcon'>{endIcon}</span>}
  </>
)

const BaseChip: React.FC<
  Omit<BaseChipProps, 'label'> & {
    children: React.ReactNode
    className?: string
    style?: CustomStyle
  }
> = ({ type, size, disabled, children, className, style }) => {
  return (
    <div
      className={cn(
        's2s-chip',
        `s2s-chip--${size}`,
        `s2s-chip--${type}`,
        className,
        {
          's2s-disabled': disabled
        }
      )}
      style={{ ...style }}
    >
      {children}
    </div>
  )
}

export const FilterChip: React.FC<
  FilterChipProps & {
    isOpen: boolean
    selectedOption: string | null
    setIsOpen: (isOpen: boolean) => void
    onSelectChange: (option: string) => void
  }
> = ({
  type,
  label,
  options = [],
  variant = 'filled',
  startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
  endIcon = <ExpandMoreIcon style={{ fontSize: 'inherit' }} />,
  disabled = false,
  size = 'md',
  isOpen,
  setIsOpen,
  selectedOption,
  onSelectChange
}) => {
  const handleSelect = (option: string) => {
    onSelectChange(option)
    setIsOpen(false)
  }

  const isSelected = Boolean(selectedOption)

  return (
    <BaseChip
      className={cn(
        `s2s-${variant}`,
        isSelected ? 's2s-selected' : 's2s-unselected'
      )}
      disabled={disabled}
      size={size}
      type={type}
    >
      <div
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className={'s2s-btn'}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen)
          }
        }}
        role='button'
        tabIndex={0}
      >
        <ChipContent
          endIcon={endIcon}
          label={selectedOption ?? label}
          startIcon={startIcon}
        />
      </div>
      {isOpen && (
        <ul className='s2s-dropdown-menu'>
          {options.map((option) => (
            <li
              aria-label={option}
              className='s2s-dropdown-item'
              key={option}
              onMouseDown={() => {
                handleSelect(option)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </BaseChip>
  )
}

export const InputChip: React.FC<InputChipProps> = ({
  type,
  label,
  variant = 'outlined',
  startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
  endIcon = <CloseRoundedIcon style={{ fontSize: 'inherit' }} />,
  disabled = false,
  size = 'md'
}) => {
  return (
    <BaseChip
      className={`s2s-${variant}`}
      disabled={disabled}
      size={size}
      type={type}
    >
      <ChipContent endIcon={endIcon} label={label} startIcon={startIcon} />
    </BaseChip>
  )
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
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
    <div className='s2s-chip-categories'>
      <BaseChip disabled={disabled} size={size} style={labelStyle} type={type}>
        <ChipContent label={label} />
      </BaseChip>
      <BaseChip disabled={disabled} size={size} style={detailStyle} type={type}>
        <ChipContent label={detail} />
      </BaseChip>
    </div>
  )
}

export const StateChip: React.FC<StateChipProps> = ({
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
    <BaseChip disabled={disabled} size={size} style={style} type={type}>
      <ChipContent label={label} startIcon={startIcon} />
    </BaseChip>
  )
}
