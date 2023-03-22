import AppRange from '~/components/app-range/AppRange'

export default {
  title: 'AppRange',
  component: AppRange,
  argTypes: {
    min: {
      description: 'The minimum value for the filter'
    },
    max: {
      description: 'The maximum value for the filter'
    },
    onChange: {
      description: 'A callback function that is called when the filter value changes',
      action: 'Changed'
    }
  }
}

const Template = (args) => <AppRange { ...args } />

export const Default = Template.bind({})
Default.args = {
  min: 0,
  max: 1000
}
