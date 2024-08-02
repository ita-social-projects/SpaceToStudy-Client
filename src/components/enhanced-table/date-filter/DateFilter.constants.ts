export type Placement =
  | 'auto-end'
  | 'auto-start'
  | 'auto'
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top'

export const datePickersOptions: {
  placement: Placement
  direction: 'from' | 'to'
}[] = [
  {
    placement: 'bottom-end',
    direction: 'from'
  },
  {
    placement: 'bottom-start',
    direction: 'to'
  }
]

export const initialState: { from: boolean; to: boolean } = {
  from: false,
  to: false
}
