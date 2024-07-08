import {
  CategoryNameInterface,
  SubjectNameInterface,
  UserMainSubject
} from '~/types'

export type OpenProfessionalCategoryModalHandler = (
  initialValues?: UserMainSubject
) => void

export type UserMainSubjectFieldValues = string &
  boolean &
  CategoryNameInterface &
  SubjectNameInterface[]
