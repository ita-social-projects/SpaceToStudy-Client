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
<<<<<<< HEAD
<<<<<<< HEAD
    getCheckboxes: {
      type: 'function',
      description: 'Function for getting value of all checkboxes',
=======
    getCheckbox: {
      type: 'function',
      description: 'Function for getting value of changed checkbox',
>>>>>>> e50220b (added line and stories updated)
=======
    getCheckboxes: {
      type: 'function',
      description: 'Function for getting value of all checkboxes',
>>>>>>> f086cc4 (updated AppSelect component to tsx and added som unit tests)
      action:'changed'
    }
  }
}

const Template = (args) => <CheckboxList { ...args } />

export const Default = Template.bind({})

const defaultItems = [{ title: 'Beginner', checked: false }, { title: 'Intermediate', checked: false }, { title: 'Advanced', checked: false }]

Default.args = {
<<<<<<< HEAD
<<<<<<< HEAD
  items:defaultItems,
  title:'Level',
  getCheckboxes:(checkboxes) => console.log('Checkboxes: ', checkboxes)
=======
    items:defaultItems,
    title:'Level',
    getCheckbox:(checkbox) => console.log('Changed checkbox:', checkbox)
>>>>>>> e50220b (added line and stories updated)
=======
  items:defaultItems,
  title:'Level',
  getCheckboxes:(checkboxes) => console.log('Checkboxes: ', checkboxes)
>>>>>>> f086cc4 (updated AppSelect component to tsx and added som unit tests)
}
