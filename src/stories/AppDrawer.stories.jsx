import AppDrawer from '~/components/app-drawer/AppDrawer'

export default {
  title: 'AppDrawer',
  component: AppDrawer,
  argTypes: {
    open: {
      type: 'boolean',
      defaultValue: true,
      description: 'Whether the drawer is open or not'
    },
    onClose: {
      action: 'Drawer closed',
      description: 'Function called when the drawer is closed'
    },
    children: {
      description: 'Content to be rendered inside the drawer'
    },
    anchor: {
      options: ['left', 'right'],
      description: 'Side to render drawer',
      control: { type: 'radio' }
    }
  }
}
const Template = (args) => <AppDrawer {...args} />

export const Default = Template.bind({})

Default.args = {
  open: true,
  anchor: 'left',
  children: <div style={{ padding: '48px' }}>Drawer is open</div>
}
