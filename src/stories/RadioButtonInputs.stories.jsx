import { useState } from 'react'
import RadioButtonInputs from '~/components/radio-button-inputs/RadioButtonInputs'

export default {
  title: 'RadioButtonInputs',
  component: RadioButtonInputs,
  argTypes: {
    items: [],
    title: {
      type: 'string',
      description: 'Component Title'
    },
    onChange: {
      type: 'function',
      description:
        'function that provides value of radio input to top level component',
      action: 'changed'
    },
    value: {
      type: 'number',
      description: 'value of default checked radio button list'
    }
  }
}

const Template = (args) => {
  const [value, setValue] = useState(2)

  return (
    <RadioButtonInputs
      {...args}
      onChange={(value) => setValue(Number(value))}
      value={value}
    />
  )
}

const defaultItems = [
  { title: 'First Radio Title', value: 0 },
  { title: 'Second Radio Title', value: 1 },
  { title: 'Third Radio Title', value: 2 },
  { title: 'Fourth Radio Title', value: 3 }
]
export const Default = Template.bind({})

Default.args = {
  title: 'Select an option',
  items: defaultItems
}
