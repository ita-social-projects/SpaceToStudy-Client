import { CheckPriceIsInRangeProps, CheckInputChangeProps, CreateNewState, InputPrice, InputPriceArrayType, PriceArrayType } from '~/types/components/price-filter/types/price-filter.types'

export const checkPriceInput = (value: InputPrice ) => value != null && isNaN(value)

export const pricesSort = (prices: InputPriceArrayType): PriceArrayType => {
  const numericPrices  = prices.map(Number)
  return [Math.min(...numericPrices ), Math.max(...numericPrices )]
}

export const createNewState = ({ prices, inputValue, inputIndex, sort }:CreateNewState):InputPriceArrayType => {
  const newState:InputPriceArrayType = [...prices]
  newState[inputIndex] = inputValue
  
  return sort ? pricesSort(newState) : newState
}

export const checkPriceIsInRange = ({ inputValue, min, max }:CheckPriceIsInRangeProps):number =>  Math.min(Math.max(Number(inputValue), min), max)

export const checkIfPricesValid = ({ inputValue, prices, constrainedPrice }:CheckInputChangeProps):boolean => inputValue === constrainedPrice && Number(prices[0]) <= Number(prices[1])

