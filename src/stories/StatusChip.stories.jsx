import StatusChip from '~/components/status-chip/StatusChip'

export default {
  title: 'StatusChip',
  component: StatusChip,
  status: {
    options: ['pending', 'active', 'closed'],
    control: { type: 'radio' }
  }
}

const Template = (args) => <StatusChip {...args} />

export const Default = Template.bind({})

Default.args = {
  status: 'pending'
}
