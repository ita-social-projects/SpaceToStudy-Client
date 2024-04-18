import { CategoryNameInterface } from '~/types'

export const getOptionLabel = (item: CategoryNameInterface) => item.name

export const isOptionEqualToValue = (
  option: CategoryNameInterface,
  value: CategoryNameInterface
) => option?._id === value?._id
