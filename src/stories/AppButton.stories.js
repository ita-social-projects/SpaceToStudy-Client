import AppButton from '~/components/app-button/AppButton'

export default {
  title: 'AppButton',
  component: AppButton,
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'radio' }
    },
    size: { options: ['large', 'medium', 'small'], control: { type: 'radio' } }
  }
}

export const Default = (args) => {
  return (
    <div
      style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <AppButton {...args} />
    </div>
  )
}

Default.args = {
  label: 'Button',
  disabled: false,
  loading: false,
  variant: 'contained',
  size: 'large',
  buttonStyle: ''
}
