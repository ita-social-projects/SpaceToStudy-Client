import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

export default {
  title: 'AppAutoComplete',
  component: AppAutoComplete,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: 'Default state of component'
    },
    fieldValue: {
      type: 'string',
      description: 'Basic value inside field input'
    },
    loading: {
      type: 'boolean',
      description: 'Loading AutoComplete component'
    },
    onChange: {
      type: 'function',
      description: 'Function will be called when autocomplete item is changed'
    },
    options: {
      type: 'array',
      description: 'Default options in autocomplete item'
    },
    filterOptions: {
      type: 'function',
      description: 'Function that describes filter options'
    }
  }
}

const Template = (args) => <AppAutoComplete {...args} />

export const Desktop = Template.bind({})

Desktop.args = {
  disabled: false,
  fieldValue: 'Type AutoComplete item here',
  loading: false,
  options: ['AutoCompleteItem-1', 'AutoCompleteItem-2', 'AutoCompleteItem-3']
}

Desktop.decorators = [
  (Story) => (
    <div style={{ maxWidth: '500px' }}>
      <Story />
    </div>
  )
]
