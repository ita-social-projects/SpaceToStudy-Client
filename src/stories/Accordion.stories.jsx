import Accordions from '~/components/accordion/Accordions'

export default {
  title: 'Accordion',
  component: Accordions,
  argTypes: {
    activeIndex: {
      type: 'number',
      description: 'The index of the active item in the accordion'
    },
    showMoreIcon: {
      type: 'boolean',
      description: 'Whether to show more icon'
    },
    square: {
      type: 'boolean',
      description: 'If true, rounded corners are disabled'
    },
    items: {
      type: 'array',
      description: 'Array of accordion items to show'
    },
    onChange: {
      type: 'function',
      description: 'Function to be called when the accordion item is changed'
    }
  }
}

const Template = (args) => <Accordions {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
  activeIndex: 0,
  showMoreIcon: false,
  square: true,
  items: [
    {
      title: 'Title 1',
      description: 'Description 1'
    },
    {
      title: 'Title 2',
      description: 'Description 2'
    }
  ],
  onChange: undefined
}
