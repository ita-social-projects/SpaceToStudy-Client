import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

export default {
  title: 'ConfirmDialog',
  component: ConfirmDialog,
  argTypes: {
    onConfirm: { action: 'Confirmed' },
    onDismiss: { action: 'Dismissed' }
  }
}

const Template = (args) => <ConfirmDialog {...args} />

export const Default = Template.bind({})

Default.args = {
  title: 'Title',
  message:
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking.',
  open: true
}
