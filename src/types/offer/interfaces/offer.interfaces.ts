import { ButtonProps } from '@mui/material/Button'
import {
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserRole,
  UserResponse,
  SubjectNameInterface,
  UserRoleEnum,
  LanguagesEnum,
  Faq,
  VariantEnum,
  CategoryNameInterface
} from '~/types'
import { LinkProps } from 'react-router-dom'

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
  handleClick: () => void
  variant: VariantEnum
  buttonProps?: Omit<LinkProps, 'onClick'> | Omit<ButtonProps, 'onClick'>
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
