export type SwitchContent = {
  text: string
  tooltip?: string
}

export type SwitchOptions = {
  [key in 'left' | 'right']?: SwitchContent
}
