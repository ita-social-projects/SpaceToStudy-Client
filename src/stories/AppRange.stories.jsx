import { useState } from 'react'
import AppRange from '~/components/app-range/AppRange'

export default {
  title: 'AppRange',
  component: AppRange,
  argTypes: {
    min: {
      type: 'number',
      description: 'The minimum value for the range slider'
    },
    max: {
      type: 'number',
      description: 'The maximum value for the range slider'
    },
    value: {
      type: 'array',
      description: 'The current value of the range slider'
    },
    onChange: {
      description:
        'A callback function that is called when the range value changes',
      action: 'Changed'
    }
  }
}

export const Default = ({ min, max, value: initialValue }) => {
  const [value, setValue] = useState(initialValue)

  return <AppRange max={max} min={min} onChange={setValue} value={value} />
}

Default.args = {
  min: 0,
  max: 1000
}
