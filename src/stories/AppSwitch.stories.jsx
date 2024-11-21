import { AppSwitch } from '~/components/app-switch/AppSwitch'
import { SizeEnum } from '~/types'

export default {
  title: 'Components/AppSwitch',
  component: AppSwitch,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the switch',
      defaultValue: ''
    },
    labelPosition: {
      control: { type: 'radio' },
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Position of the label relative to the switch',
      defaultValue: 'end'
    },
    size: {
      control: { type: 'radio' },
      options: [SizeEnum.Small, SizeEnum.Medium, SizeEnum.Large],
      description: 'Size of the switch',
      defaultValue: SizeEnum.Medium
    },
    loading: {
      control: 'boolean',
      description: 'Disables the switch and displays loading state',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch',
      defaultValue: false
    }
  }
}

const Template = (args) => <AppSwitch {...args} />

export const Default = Template.bind({})
Default.args = {
  size: SizeEnum.Medium,
  disabled: false,
  loading: false
}

export const DefaultWithLabel = Template.bind({})
DefaultWithLabel.args = {
  label: 'Default Switch with Label',
  size: SizeEnum.Medium,
  labelPosition: 'end',
  disabled: false,
  loading: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled Switch',
  size: SizeEnum.Medium,
  labelPosition: 'end',
  disabled: true
}

export const Loading = Template.bind({})
Loading.args = {
  label: 'Loading Switch',
  size: SizeEnum.Medium,
  labelPosition: 'end',
  loading: true
}

export const LargeSize = Template.bind({})
LargeSize.args = {
  label: 'Large Switch',
  size: SizeEnum.Large,
  labelPosition: 'end',
  disabled: false
}

export const SmallSize = Template.bind({})
SmallSize.args = {
  label: 'Small Switch',
  size: SizeEnum.Small,
  labelPosition: 'end',
  disabled: false
}

export const TopPosition = Template.bind({})
TopPosition.args = {
  label: 'Top Position',
  size: SizeEnum.Medium,
  labelPosition: 'top',
  disabled: false
}

export const StartPosition = Template.bind({})
StartPosition.args = {
  label: 'Start Position',
  size: SizeEnum.Medium,
  labelPosition: 'start',
  disabled: false
}

export const BottomPosition = Template.bind({})
BottomPosition.args = {
  label: 'Bottom Position',
  size: SizeEnum.Medium,
  labelPosition: 'bottom',
  disabled: false
}
