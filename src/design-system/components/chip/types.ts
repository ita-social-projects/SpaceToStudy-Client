import { type CSSProperties, type ReactNode } from 'react'

type ChipType = 'category' | 'filter' | 'input' | 'state'

type ChipColor =
  | 'blue'
  | 'blue-gray'
  | 'green'
  | 'neutral'
  | 'purple'
  | 'red'
  | 'turquoise'
  | 'yellow'

type ChipWithLabel = {
  label: string
}

type ChipWithIcons = {
  endIcon?: ReactNode
  startIcon?: ReactNode
}

type CommonChipProps<T extends ChipType> = {
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  type: T
}

type FilterChipProps = CommonChipProps<'filter'> &
  ChipWithLabel &
  ChipWithIcons & {
    initialIsOpen?: boolean
    initialSelectedOption?: string | null
    isOpen?: boolean
    onIsOpenChange?: (isOpen: boolean) => void
    onSelectedOptionChange?: (option: string) => void
    options: string[]
    selectedOption?: string | null
    variant?: 'filled' | 'minimal'
  }

type InputChipProps = CommonChipProps<'input'> &
  ChipWithLabel &
  ChipWithIcons & {
    onRemoveButtonClick?: () => void
    variant?: 'filled' | 'outlined' | 'filled-outlined'
  }

type CategoryChipProps = CommonChipProps<'category'> &
  ChipWithLabel & {
    color?: ChipColor
    detail: string
  }

type StateChipProps = CommonChipProps<'state'> &
  ChipWithLabel &
  Pick<ChipWithIcons, 'startIcon'> & {
    color?: ChipColor
  }

type ChipContentProps = ChipWithLabel & ChipWithIcons

type BaseChipProps = CommonChipProps<ChipType> & {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

type ChipProps =
  | FilterChipProps
  | InputChipProps
  | CategoryChipProps
  | StateChipProps

export {
  type BaseChipProps,
  type CategoryChipProps,
  type ChipContentProps,
  type ChipProps,
  type FilterChipProps,
  type InputChipProps,
  type StateChipProps,
  type ChipColor
}
