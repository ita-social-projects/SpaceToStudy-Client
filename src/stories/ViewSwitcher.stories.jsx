import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'

export default {
  title: 'ViewSwitcher',
  component: ViewSwitcher,
  argTypes: {
    onChange: {
      type: 'function',
      description: 'change offers card view'
    },
    value: {
      options: ['inline', 'grid'],
      control: { type: 'radio' },
      description: 'offers view state'
    }
  }
}

const Template = (args) => <ViewSwitcher {...args} />

export const Default = Template.bind({})

Default.args = {
  onChange: (view) => console.log('Updated view: ', view),
  value: 'inline'
}
