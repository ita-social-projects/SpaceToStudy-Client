export const createMarks = (min, max) => [
  {
    value: min,
    label: min.toString()
  },
  {
    value: max,
    label: max.toString()
  }
]

export const checkRangeInput = (value) => !(value != null && isNaN(value))

export const rangeSort = (range) => {
  const numericPrices = range.map(Number)
  return [Math.min(...numericPrices), Math.max(...numericPrices)]
}

export const createNewState = ({ range, inputValue, inputIndex, sort }) => {
  const newState = [...range]
  newState[inputIndex] = inputValue

  return sort ? rangeSort(newState) : newState
}

export const checkNumberIsInRange = ({ inputValue, min, max }) =>
  Math.min(Math.max(Number(inputValue), min), max)

export const checkIfRangeValid = ({ inputValue, range, constrainedNumber }) =>
  !(inputValue === constrainedNumber && Number(range[0]) <= Number(range[1]))

export const checkRangeEquality = (range, value) =>
  range[0] !== Number(value[0]) || range[1] !== Number(value[1])

export const isDefaultPrice = (value, defauitPrice) => {
  return (
    Number(value[0]) === defauitPrice?.[0] &&
    Number(value[1]) === defauitPrice?.[1]
  )
}

export const isEmptyArray = (value) =>
  Array.isArray(value) && value.length === 0

export const minMaxPrice = (value, step) => {
  return [Math.round(value - value * step), Math.round(value + value * step)]
}
