import Accordions from '~/components/accordion/Accordions'

export default {
  title: 'Accordion',
  component: Accordions,
  argTypes: {
    activeIndex: {
      type: ['number', 'array'],
      description: 'The index of the active item in the accordion'
    },
    icon: {
      type: 'object',
      description:
        'Icon of accordion, if to pass, style of accordion will be changed'
    },
    items: {
      type: 'array',
      description: 'Array of accordion items to show'
    },
    onChange: {
      type: 'function',
      description: 'Function to be called when the accordion item is changed'
    },
    sx: {
      type: 'object',
      description: 'Style for accordion'
    },
    titleVariant: {
      type: 'string',
      description: 'Variant of accordion titles'
    },
    descriptionVariant: {
      type: 'string',
      description: 'Variant of accordion descriptions'
    }
  }
}

const Template = (args) => <Accordions {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
  activeIndex: 0,
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
  onChange: undefined,
  titleVariant: 'h6',
  descriptionVariant: 'body2'
}
