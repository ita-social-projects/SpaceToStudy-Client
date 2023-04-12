import AppButton from '~/components/app-button/AppButton'

export default {
  title: 'AppButton',
  component: AppButton,
  argTypes: {
    label: { description: 'Label of the button' },
    variant: {
      description: 'Variant of the button',
      options: ['contained', 'outlined', 'text'],
      control: { type: 'radio' }
    },
    disabled: { description: 'Disables button if true' },
    loading: { description: 'Hides button and shows loader if true' },
    size: {
      description: 'Size of the button',
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' }
    },
    sx: { description: 'Styles for button' }
  }
}

export const Default = (args) => {
  return (
    <div
      style={{
        maxWidth: '200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AppButton {...args}>{args.label}</AppButton>
    </div>
  )
}

Default.args = {
  label: 'Button',
  disabled: false,
  loading: false,
  variant: 'contained',
  size: 'large',
  sx: { width: '100%', py: '18px' }
}
