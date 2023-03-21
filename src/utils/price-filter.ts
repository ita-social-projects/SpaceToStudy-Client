import { CheckPriceIsInRange, CheckInputChange, CreateNewState, InputPrice, InputPriceArray, PriceArray } from '~/types'

export const checkPriceInput = (value: InputPrice ) => value != null && isNaN(value)

export const pricesSort = (prices: InputPriceArray): PriceArray => {
  const numericPrices  = prices.map(Number)
  return [Math.min(...numericPrices ), Math.max(...numericPrices )]
}

export const createNewState = ({ prices, inputValue, inputIndex, sort }:CreateNewState):InputPriceArray => {
  const newState:InputPriceArray = [...prices]
  newState[inputIndex] = inputValue
  
  return sort ? pricesSort(newState) : newState
}

export const checkPriceIsInRange = ({ inputValue, min, max }:CheckPriceIsInRange):number =>  Math.min(Math.max(Number(inputValue), min), max)

export const checkIfPricesValid = ({ inputValue, prices, constrainedPrice }:CheckInputChange):boolean => inputValue === constrainedPrice && Number(prices[0]) <= Number(prices[1])

