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
    pageSize: {
      type: 'number',
      description: 'Set number of items'
    },
    setCurrentPage: {
      type: 'function',
      action: 'setCurrentPage',
      description: 'Function that handles delete'
    },
    size: {
      options: ['small', 'medium', 'large'],
      description: 'Size pagination',
      control: { type: 'radio' }
    }
  }
}

const Template = (args) => <AppPagination { ...args } />

export const Default = Template.bind({})

Default.args = {
  page: 1,
  itemsCount: 100,
  pageSize: 5,
  size: 'medium',
  setCurrentPage: undefined
}
