import AppSelect from '~/components/app-select/AppSelect'
import { sortByFields } from '~/constants'

const StudentProfile = () => {
  return (
    <div>
      StudentProfile Page Placeholder
      { ' ' }
      <AppSelect
        sortBy={ 'popularity' } sortingFields={ [
          { value:sortByFields.newest,title:'Newest' },
          { value:sortByFields.popularity,title:'Popularity' },
          { value:sortByFields.tutorRating,title:'Tutor rating' },
        ] }
      />
    </div>
  )
}

export default StudentProfile
