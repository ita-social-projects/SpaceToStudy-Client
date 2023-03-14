import CheckboxList from '~/components/checkbox-list/CheckboxList'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'CheckboxList',
  component: CheckboxList,
  argTypes: {
    items: [],
    title: {
      type: 'string',
      description: 'Title of this component'
    },
    getCheckbox: {
      type: 'function',
      description: 'Function for getting value of changed checkbox',
      action:'changed'
    }
  }
} as ComponentMeta<typeof CheckboxList>

const Template: ComponentStory<typeof CheckboxList> = (args) => <CheckboxList {...args} />

export const Default = Template.bind({})

const defaultItems = [{ title: 'Beginner', checked: false }, { title: 'Intermediate', checked: false }, { title: 'Advanced', checked: false }]

Default.args = {
    items:defaultItems,
    title:'Level',
    getCheckbox:(checkbox) => console.log('Changed checkbox:', checkbox)
}
