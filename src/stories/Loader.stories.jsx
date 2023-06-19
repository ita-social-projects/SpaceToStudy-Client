import Loader from '~/components/loader/Loader'

export default {
  title: 'Loader',
  component: Loader,
  argTypes: {
    size: {
      description: 'Size of the loader',
      type: 'number'
    },
    sx: { description: 'Styles for loader', type: 'object' }
  }
}

export const Default = (args) => <Loader {...args} />

Default.args = {
  size: 70,
  sx: { color: { opacity: 0.6 } }
}
