import {
  CategoryInterface,
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserRole,
  UserResponse,
  SubjectNameInterface,
  UserRoleEnum,
  LanguagesEnum
} from '~/types'

export interface Offer extends CommonEntityFields {
  price: number
  proficiencyLevel: ProficiencyLevelEnum[]
  description?: string
  languages: LanguagesEnum[]
  authorRole: UserRole
  authorFirstName: string
  authorLastName: string
  authorAvgRating: number
  author: Pick<
    UserResponse,
    '_id' | 'totalReviews' | 'photo' | 'professionalSummary'
  >
  subject: SubjectNameInterface
  category: Pick<CategoryInterface, '_id'>
}

export interface ButtonActions {
  label: string
  handleClick: () => void
}

export interface PriceRangeParams {
  authorRole: UserRoleEnum
  categoryId?: string
  subjectId?: string
}

export interface PriceRangeResponse {
  minPrice: number
  maxPrice: number
}
