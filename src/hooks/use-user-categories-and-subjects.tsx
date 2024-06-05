import { useCallback, useMemo } from 'react'

import { customOptions } from '~/utils/course-custom-options'
import {
  CategoryNameInterface,
  CourseAutocompleteOptionsEnum,
  CourseExtendedAutocompleteOptions,
  SubjectNameInterface,
  UserResponse
} from '~/types'

interface useUserCategoriesAndSubjectsProps {
  user: UserResponse | null
}

const useUserCategoriesAndSubjects = ({
  user
}: useUserCategoriesAndSubjectsProps) => {
  const { Subjects } = CourseAutocompleteOptionsEnum

  const userCategories = useMemo(
    () => user?.mainSubjects.tutor?.map((item) => item.category.name) ?? [],
    [user?.mainSubjects.tutor]
  )

  const userSubjects = useMemo(
    () =>
      user?.mainSubjects.tutor?.flatMap((item) =>
        item.subjects.map((subject) => subject.name)
      ) ?? [],
    [user?.mainSubjects.tutor]
  )

  const transformCategories = useCallback(
    (response: CategoryNameInterface[]): CourseExtendedAutocompleteOptions[] =>
      customOptions(response, userCategories),
    [userCategories]
  )

  const transformSubjects = useCallback(
    (response: SubjectNameInterface[]): CourseExtendedAutocompleteOptions[] =>
      customOptions(response, userSubjects, Subjects),
    [Subjects, userSubjects]
  )

  return { transformCategories, transformSubjects }
}

export default useUserCategoriesAndSubjects
