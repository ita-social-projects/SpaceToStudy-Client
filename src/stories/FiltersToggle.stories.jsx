import FiltersToggle from '~/components/filters-toggle/FiltersToggle'

export default {
  title: 'FiltersToggle',
  component: FiltersToggle,
  argTypes: {
    chosenFiltersQty: {
      type: 'number',
      description: 'Quantity of chosen filters'
    },
    handleToggle: {
      type: 'function',
      description: 'Toggling filters'
    }
  }
}

const Template = (args) => <FiltersToggle { ...args } />

export const Default = Template.bind({})


Default.args = {
  chosenFiltersQty:0,
  handleToggle:() => console.log('Toggle')
}
