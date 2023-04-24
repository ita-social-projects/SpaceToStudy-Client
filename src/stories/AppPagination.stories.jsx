import AppPagination from '~/components/app-pagination/AppPagination'

export default {
  title: 'AppPagination',
  component: AppPagination,
  argTypes: {
    page: {
      type: 'number',
      description: 'Show current page'
    },
    itemsCount: {
      type: 'number',
      description: 'Label of the chip'
    },
    itemsPerPage: {
      type: 'number',
      description: 'Set number of items'
    },
    onChange: {
      type: 'function',
      action: 'onChange',
      description: 'Function that handles delete'
    },
    size: {
      options: ['small', 'medium', 'large'],
      description: 'Size pagination',
      control: { type: 'radio' }
    }
  }
}

const Template = (args) => <AppPagination {...args} />

export const Default = Template.bind({})

Default.args = {
  page: 1,
  itemsCount: 100,
  itemsPerPage: 5,
  size: 'medium',
  onChange: undefined
}
