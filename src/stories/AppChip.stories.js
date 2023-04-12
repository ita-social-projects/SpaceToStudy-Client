import AppChip from '~/components/app-chip/AppChip'

export default {
  title: 'AppChip',
  component: AppChip,
  argTypes: {
    handleDelete: {
      type: 'function',
      action: 'handleDelete',
      description: 'Function that handles delete'
    },
    label: {
      type: 'string',
      control: 'text',
      description: 'Label of the chip'
    }
  }
}

const Chip = (args) => <AppChip {...args}>{args.label}</AppChip>

export const Default = Chip.bind({})

Default.args = {
  label: 'Text'
}

Default.decorators = [
  (Story) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Story />
    </div>
  )
]
