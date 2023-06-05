import {
  CheckInputChange,
  InputRange,
  CreateNewState,
  InputRangeArray,
  CheckRangeIsInRange,
  RangeArray
} from '~/types'

export const createMarks = (min: number, max: number) => [
  {
    value: min,
    label: min.toString()
  },
  {
    value: max,
    label: max.toString()
  }
]

export const checkRangeInput = (value: InputRange): boolean =>
  !(value != null && isNaN(value))

export const rangeSort = (range: InputRangeArray): RangeArray => {
  const numericPrices = range.map(Number)
  return [Math.min(...numericPrices), Math.max(...numericPrices)]
}

export const createNewState = ({
  range,
  inputValue,
  inputIndex,
  sort
}: CreateNewState): InputRangeArray => {
  const newState: InputRangeArray = [...range]
  newState[inputIndex] = inputValue

  return sort ? rangeSort(newState) : newState
}

export const checkNumberIsInRange = ({
  inputValue,
  min,
  max
}: CheckRangeIsInRange): number =>
  Math.min(Math.max(Number(inputValue), min), max)

export const checkIfRangeValid = ({
  inputValue,
  range,
  constrainedNumber
}: CheckInputChange): boolean =>
  !(inputValue === constrainedNumber && Number(range[0]) <= Number(range[1]))

export const checkRangeEquality = (
  range: RangeArray,
  value: RangeArray
): boolean => range[0] !== Number(value[0]) || range[1] !== Number(value[1])

export const isDefaultPrice = (
  value: string | string[],
  defauitPrice?: RangeArray
): boolean => {
  return (
    Number(value[0]) === defauitPrice?.[0] &&
    Number(value[1]) === defauitPrice?.[1]
  )
}

export const isEmptyArray = <T,>(value: T): boolean =>
  Array.isArray(value) && value.length === 0

export const minMaxPrice = (value: number, step: number) => {
  return [Math.round(value - value * step), Math.round(value + value * step)]
}
