import { ButtonProps } from '@mui/material/Button'
import {
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserResponse,
  SubjectNameInterface,
  LanguagesEnum,
  Faq,
  CategoryNameInterface,
  UserRoleEnum
} from '~/types'

export interface Offer extends CommonEntityFields {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum[]
  description: string
  languages: LanguagesEnum[]
  authorRole: UserRoleEnum.Tutor | UserRoleEnum.Student
  authorFirstName: string
  authorLastName: string
  authorAvgRating: number
  author: Pick<
    UserResponse,
    '_id' | 'totalReviews' | 'photo' | 'professionalSummary'
  >
  subject: SubjectNameInterface
  category: CategoryNameInterface
  faq: Faq[]
}

export interface ButtonActions {
  label: string
  buttonProps?: ButtonProps
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

export interface GetOffersResponse {
  offers: Offer[]
  count: number
}
