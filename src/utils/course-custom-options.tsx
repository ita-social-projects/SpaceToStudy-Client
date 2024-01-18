import {
  CategoryNameInterface,
  CourseAutocompleteOptionsEnum,
  SubjectNameInterface
} from '~/types'

const { Categories } = CourseAutocompleteOptionsEnum

export const customOptions = (
  response: CategoryNameInterface[] | SubjectNameInterface[],
  userOptions: string[],
  optionsType: CourseAutocompleteOptionsEnum = Categories
) => {
  return response.length
    ? response
        .map((item) => ({
          ...item,
          title: userOptions.includes(item.name)
            ? `course.your${optionsType}`
            : `course.other${optionsType}`
        }))
        .sort((a) => (a.title === `course.your${optionsType}` ? -1 : 1))
    : []
}
