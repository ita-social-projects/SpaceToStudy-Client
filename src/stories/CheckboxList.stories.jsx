import CheckboxList from '~/components/checkbox-list/CheckboxList'

export default {
  title: 'CheckboxList',
  component: CheckboxList,
  argTypes: {
    items: [],
    title: {
      type: 'string',
      description: 'Title of this component'
    },
    getCheckboxes: {
      type: 'function',
      description: 'Function for getting value of all checkboxes',
      action: 'changed'
    }
  }
}

const Template = (args) => <CheckboxList {...args} />

export const Default = Template.bind({})

const defaultItems = ['Beginner', 'Intermediate', 'Advanced']

Default.args = {
  items: defaultItems,
  title: 'Level',
  getCheckboxes: (checkboxes) => console.log('Checkboxes: ', checkboxes)
}
