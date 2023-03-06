import SortBySelect from '~/components/sort-by-select/SortBySelect'
import { sortByFields } from '~/constants'

export default {
  title: 'SortBySelect',
  component: SortBySelect,
  argTypes: {
    setSortBy:{
      type:'function',
      description:'change sorting by some field'
    },
    sortBy:{
      options: [sortByFields.newest, sortByFields.popularity,sortByFields.tutorRating],
      control: { type: 'radio' },
      description:'offers view state'
    },
    sortingFields: {
      type: 'array',
      description: 'Array of fields for sorting by them'
    }
  }
}

const Template = (args) => <SortBySelect { ...args } />

export const Default = Template.bind({})

Default.args = {
  setSortBy:(e) => console.log('Updated sortBy:', e.target.value),
  sortBy:'popularity',
  sortingFields:[
    { value:sortByFields.newest,title:'Newest' },
    { value:sortByFields.popularity,title:'Popularity' },
    { value:sortByFields.tutorRating,title:'Tutor rating' },
  ]
}
