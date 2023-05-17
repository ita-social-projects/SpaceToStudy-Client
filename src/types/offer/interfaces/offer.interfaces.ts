import {
  CategoryInterface,
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserRole,
  UserResponse,
  SubjectNameInterface,
  UserRoleEnum,
  LanguagesEnum,
  Faq
} from '~/types'
import { LinkProps } from 'react-router-dom'

export interface Offer extends CommonEntityFields {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum[]
  description: string
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
  category: CategoryInterface['_id']
  faq: Faq[]
}

export interface ButtonActions {
  label: string
  handleClick: () => void
  buttonProps?: LinkProps
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
