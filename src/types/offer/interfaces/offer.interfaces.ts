import { ButtonProps } from '@mui/material/Button'
import {
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserResponse,
  SubjectNameInterface,
  LanguagesEnum,
  Faq,
  UserRoleEnum,
  CategoryInterface
} from '~/types'

export interface Offer extends CommonEntityFields {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum[]
  description: string
  languages: LanguagesEnum[]
  authorRole: UserRoleEnum.Tutor | UserRoleEnum.Student
  author: Pick<
    UserResponse,
    | '_id'
    | 'totalReviews'
    | 'photo'
    | 'professionalSummary'
    | 'firstName'
    | 'lastName'
    | 'FAQ'
    | 'averageRating'
  >
  subject: SubjectNameInterface
  category: CategoryInterface
  FAQ: Faq[]
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
