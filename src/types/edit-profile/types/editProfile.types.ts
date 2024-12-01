import {
  CategoryNameInterface,
  SubjectNameInterface,
  UserMainSubject,
  UpdatedPhoto
} from '~/types'

export type OpenProfessionalCategoryModalHandler = (
  initialValues?: UserMainSubject,
  isEdit?: boolean
) => void

export type UserMainSubjectFieldValues = string &
  boolean &
  CategoryNameInterface &
  SubjectNameInterface[]

export type EditProfilePhoto = UpdatedPhoto | string | null
