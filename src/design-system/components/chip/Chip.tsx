import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import CircleIcon from '@mui/icons-material/Circle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import './Chip.scss'

type ChipType = 'filter' | 'input' | 'category' | 'state'

type BaseChipProps = {
  type: ChipType
  size?: 'sm' | 'md' | 'lg'
  color?: string
  disabled?: boolean
}

type FilterChipProps = BaseChipProps & {
  type: 'filter'
  label: string
  variant?: 'filled' | 'minimal'
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  disabled?: boolean
}

type InputChipProps = BaseChipProps & {
  type: 'input'
  label: string
  variant?: 'filled' | 'outlined' | 'filled-outlined'
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  disabled?: boolean
}

type CategoryChipProps = BaseChipProps & {
  type: 'category'
  subject: string
  level: string
}

type StateChipProps = BaseChipProps & {
  type: 'state'
  label: string
  startIcon?: React.ReactNode
}

export type ChipProps =
  | FilterChipProps
  | InputChipProps
  | CategoryChipProps
  | StateChipProps

type CustomStyle = CSSProperties & {
  [key: `--chip-${string}`]: string | undefined
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  variant = 'filled',
  startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
  endIcon = <ExpandMoreIcon style={{ fontSize: 'inherit' }} />,
  disabled = false,
  size = 'md'
}) => {
  const classes = classNames('chip', `chip--${size}`, `chip--filter`, variant, {
    disabled
  })
  return (
    <div className={classes}>
      {startIcon && <span className='startIcon'>{startIcon}</span>}
      <span className='label'>{label}</span>
      {endIcon && <span className='endIcon'>{endIcon}</span>}
    </div>
  )
}

const InputChip: React.FC<InputChipProps> = ({
  label,
  variant = 'outlined',
  startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
  endIcon = <CloseRoundedIcon style={{ fontSize: 'inherit' }} />,
  disabled = false,
  size = 'md'
}) => {
  const classes = classNames('chip', `chip--${size}`, `chip--input`, variant, {
    disabled
  })
  return (
    <div className={classes}>
      {startIcon && <span className='startIcon'>{startIcon}</span>}
      <span className='label'>{label}</span>
      {endIcon && <span className='endIcon'>{endIcon}</span>}
    </div>
  )
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  subject,
  level,
  size = 'md',
  color = 'blue-gray',
  disabled = false
}) => {
  const subjectStyle: CustomStyle = {
    '--chip-text-color': `var(--s2s-${color}-900)`,
    '--chip-bg-color': `var(--s2s-${color}-300)`
  }

  const levelStyle: CustomStyle = {
    '--chip-text-color': `var(--s2s-${color}-900)`,
    '--chip-bg-color': `var(--s2s-${color}-100)`
  }

  return (
    <div className='chip--categories'>
      <div
        className={classNames(
          'chip',
          `chip--${size}`,
          'chip--category',
          'subject',
          { disabled }
        )}
        style={subjectStyle}
      >
        <span className='label'>{subject}</span>
      </div>
      <div
        className={classNames(
          'chip',
          `chip--${size}`,
          'chip--category',
          'level',
          { disabled }
        )}
        style={levelStyle}
      >
        <span className='label'>{level}</span>
      </div>
    </div>
  )
}

const StateChip: React.FC<StateChipProps> = ({
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
      className={classNames('chip', `chip--${size}`, 'chip--state', {
        disabled
      })}
      style={style}
    >
      {startIcon && <span className='startIcon'>{startIcon}</span>}
      <span className='label'>{label}</span>
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
