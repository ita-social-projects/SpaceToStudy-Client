import AppSelect from '~/components/app-select/AppSelect'
import { sortByFields } from '~/constants'

export default {
  title: 'AppSelect',
  component: AppSelect,
  argTypes: {
    setSortedValue: {
      type: 'function',
      description: 'change sorting by some field'
    },
    sortedValue: {
      options: [
        sortByFields.newest,
        sortByFields.popularity,
        sortByFields.tutorRating
      ],
      control: { type: 'radio' },
      description: 'offers view state'
    },
    fields: {
      type: 'array',
      description: 'Array of fields for sorting by them'
    },
    selectTitle: {
      type: 'string',
      description: 'Title for select'
    }
  }
}

const Template = (args) => <AppSelect {...args} />

export const Default = Template.bind({})

Default.args = {
  setSortedValue: (e) => console.log('Updated sortBy:', e.target.value),
  sortedValue: 'popularity',
  fields: [
    { value: sortByFields.newest, title: 'Newest' },
    { value: sortByFields.popularity, title: 'Popularity' },
    { value: sortByFields.tutorRating, title: 'Tutor rating' }
  ],
  selectTitle: 'Here can be your select title'
}
