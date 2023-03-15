import PriceFilter from '~/components/price-filter/PriceFilter'

export default {
  title: 'PriceFilter',
  component: PriceFilter,
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

const Template = (args) => <PriceFilter { ...args } />

export const Default = Template.bind({})
Default.args = {
  min: 0,
  max: 1000
}
