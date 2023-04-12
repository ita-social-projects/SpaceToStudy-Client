export type InputRange = number | null
export type RangeArray = [number, number]
export type InputRangeArray = [InputRange, InputRange]

export interface CheckInputChange {
  inputValue: InputRange
  range: InputRangeArray
  constrainedNumber: number
}

export interface CheckRangeIsInRange {
  inputValue: InputRange
  min: number
  max: number
}

export interface CreateNewState
  extends Omit<CheckInputChange, 'constrainedNumber'> {
  inputIndex: number
  sort?: boolean
}
