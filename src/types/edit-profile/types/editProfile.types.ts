import {
  CategoryNameInterface,
  SubjectNameInterface,
  UserMainSubject
} from '~/types'

export type OpenProfessionalCategoryModalHandler = (
  initialValues?: UserMainSubject,
  isEdit?: boolean
) => void

export type UserMainSubjectFieldValues = string &
  boolean &
  CategoryNameInterface &
  SubjectNameInterface[]
