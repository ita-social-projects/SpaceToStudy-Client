export type InputPrice = number|null
export type PriceArrayType = [number, number]
export type InputPriceArrayType = [InputPrice, InputPrice]

export interface CheckInputChangeProps {
    inputValue: InputPrice
    prices: InputPriceArrayType
    constrainedPrice: number
}

export interface CheckPriceIsInRangeProps {
    inputValue: InputPrice
    min: number
    max: number
}

export interface CreateNewState extends Omit<CheckInputChangeProps, 'constrainedPrice'> {
    inputIndex: number
    sort?: boolean
}
