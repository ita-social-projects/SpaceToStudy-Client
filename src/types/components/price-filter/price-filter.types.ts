export type InputPrice = number|null
export type PriceArray = [number, number]
export type InputPriceArray = [InputPrice, InputPrice]

export interface CheckInputChange {
    inputValue: InputPrice
    prices: InputPriceArray
    constrainedPrice: number
}

export interface CheckPriceIsInRange {
    inputValue: InputPrice
    min: number
    max: number
}

export interface CreateNewState extends Omit<CheckInputChange, 'constrainedPrice'> {
    inputIndex: number
    sort?: boolean
}
