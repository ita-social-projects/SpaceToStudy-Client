import CircleIcon from '@mui/icons-material/Circle'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { type CSSProperties, forwardRef, useCallback, useState } from 'react'

import { cn } from '~/utils/cn'

import {
  type BaseChipProps,
  type ChipContentProps,
  type InputChipProps,
  type CategoryChipProps,
  type FilterChipProps,
  type StateChipProps
} from './types'

import './Chip.scss'

const ChipContent: React.FC<ChipContentProps> = ({
  endIcon,
  label,
  startIcon
}) => (
  <>
    {startIcon && <span className='s2s-startIcon'>{startIcon}</span>}
    <span className='s2s-label'>{label}</span>
    {endIcon && <span className='s2s-endIcon'>{endIcon}</span>}
  </>
)

const BaseChip = forwardRef<HTMLDivElement, BaseChipProps>(
  ({ children, className, disabled, size, style, type }, reference) => {
    return (
      <div
        className={cn(
          's2s-chip',
          `s2s-chip--${size}`,
          `s2s-chip--${type}`,
          disabled && 's2s-disabled',
          className
        )}
        ref={reference}
        style={style}
      >
        {children}
      </div>
    )
  }
)

BaseChip.displayName = 'BaseChip'

const FilterChip = forwardRef<HTMLDivElement, FilterChipProps>(
  (
    {
      disabled,
      endIcon = <ExpandMoreIcon style={{ fontSize: 'inherit' }} />,
      initialIsOpen = false,
      initialSelectedOption = null,
      isOpen: externalIsOpen,
      label,
      onIsOpenChange,
      onSelectedOptionChange,
      options = [],
      selectedOption: externalSelectedOption,
      size = 'md',
      startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
      type,
      variant = 'filled'
    },
    reference
  ) => {
    const [internalIsOpen, setInternalIsOpen] = useState<boolean>(initialIsOpen)
    const [internalSelectedOption, setInternalSelectedOption] = useState<
      null | string
    >(initialSelectedOption)

    const isOpenStateControlled = externalIsOpen !== undefined
    const isSelectedStateControlled = externalSelectedOption !== undefined

    const handleToggleIsOpen = useCallback(() => {
      if (!isOpenStateControlled) {
        setInternalIsOpen(!internalIsOpen)
      }

      onIsOpenChange?.(!(externalIsOpen ?? internalIsOpen))
    }, [externalIsOpen, internalIsOpen, isOpenStateControlled, onIsOpenChange])

    const handleSelectedChange = useCallback(
      (selectedOption: string) => {
        return () => {
          if (!isSelectedStateControlled) {
            setInternalSelectedOption(selectedOption)
          }

          onSelectedOptionChange?.(selectedOption)
          handleToggleIsOpen()
        }
      },
      [handleToggleIsOpen, isSelectedStateControlled, onSelectedOptionChange]
    )

    const resolvedSelectedOption = isSelectedStateControlled
      ? externalSelectedOption
      : internalSelectedOption
    const resolvedIsOpen = externalIsOpen ?? internalIsOpen

    const isSelected = Boolean(resolvedSelectedOption)

    return (
      <BaseChip
        className={cn(
          `s2s-${variant}`,
          isSelected ? 's2s-selected' : 's2s-unselected'
        )}
        disabled={disabled}
        ref={reference}
        size={size}
        type={type}
      >
        <button
          aria-disabled={disabled}
          aria-expanded={externalIsOpen}
          aria-haspopup='listbox'
          className='s2s-dropdown-trigger'
          data-testid='s2s-dropdown-trigger'
          disabled={disabled}
          onClick={handleToggleIsOpen}
        >
          <ChipContent
            endIcon={endIcon}
            label={resolvedSelectedOption ?? label}
            startIcon={startIcon}
          />
        </button>
        {resolvedIsOpen && !disabled && (
          <ul className='s2s-dropdown-menu' data-testid='s2s-dropdown-menu'>
            {options.map((option, index) => (
              <li key={`${option}-${index}`}>
                <button
                  aria-label={option}
                  className='s2s-dropdown-item'
                  onClick={handleSelectedChange(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </BaseChip>
    )
  }
)

FilterChip.displayName = 'FilterChip'

const InputChip = forwardRef<HTMLDivElement, InputChipProps>(
  (
    {
      disabled,
      endIcon = <CloseRoundedIcon style={{ fontSize: 'inherit' }} />,
      label,
      onRemoveButtonClick,
      size = 'md',
      startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
      type,
      variant = 'outlined'
    },
    reference
  ) => {
    const removeButton = (
      <button
        className='s2s-input-chip-remove-btn'
        data-testid='s2s-input-chip-remove-btn'
        onClick={onRemoveButtonClick}
      >
        {endIcon}
      </button>
    )

    return (
      <BaseChip
        className={`s2s-${variant}`}
        disabled={disabled}
        ref={reference}
        size={size}
        type={type}
      >
        <ChipContent
          endIcon={removeButton}
          label={label}
          startIcon={startIcon}
        />
      </BaseChip>
    )
  }
)

InputChip.displayName = 'InputChip'

const CategoryChip = forwardRef<HTMLDivElement, CategoryChipProps>(
  (
    { color = 'blue-gray', detail, disabled, label, size = 'md', type },
    reference
  ) => {
    const labelStyle = {
      '--chip-bg-color': `var(--s2s-${color}-300)`,
      '--chip-text-color': `var(--s2s-${color}-900)`
    } as CSSProperties

    const detailStyle = {
      '--chip-bg-color': `var(--s2s-${color}-100)`,
      '--chip-text-color': `var(--s2s-${color}-900)`
    } as CSSProperties

    return (
      <div className='s2s-chip-categories' ref={reference}>
        <BaseChip
          disabled={disabled}
          size={size}
          style={labelStyle}
          type={type}
        >
          <ChipContent label={label} />
        </BaseChip>
        <BaseChip
          disabled={disabled}
          size={size}
          style={detailStyle}
          type={type}
        >
          <ChipContent label={detail} />
        </BaseChip>
      </div>
    )
  }
)

CategoryChip.displayName = 'CategoryChip'

const StateChip = forwardRef<HTMLDivElement, StateChipProps>(
  (
    {
      color = 'blue-gray',
      disabled,
      label,
      size = 'md',
      startIcon = <CircleIcon style={{ fontSize: 'inherit' }} />,
      type
    },
    reference
  ) => {
    const style = {
      '--chip-bg-color': `var(--s2s-${color}-100)`,
      '--chip-border-color': `var(--s2s-${color}-700)`,
      '--chip-text-color': `var(--s2s-${color}-700)`
    } as CSSProperties

    return (
      <BaseChip
        disabled={disabled}
        ref={reference}
        size={size}
        style={style}
        type={type}
      >
        <ChipContent label={label} startIcon={startIcon} />
      </BaseChip>
    )
  }
)

StateChip.displayName = 'StateChip'

export { CategoryChip, FilterChip, InputChip, StateChip }
