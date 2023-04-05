import { Address, Category } from '~/types/types/common.types'

export interface UserInterface {
  firstName: string
  lastName: string
  photo?: string
}

export interface CategoryInterface {
  name: string
}

export interface SubjectInterface {
  name: string
}

export interface OfferInterface {
  category: CategoryInterface
  subject: SubjectInterface
  proficiencyLevel: string
}

export interface ReviewInterface {
  offer: OfferInterface
  author: UserInterface
  comment: string
  rating: number
  createdAt: string
}

export interface User {
  _id: string
  role: string[]
  firstName: string
  lastName: string
  email: string
  categories: Category[]
  totalReviews: number
  averageRating: number
  nativeLanguage: string
  address: Address
  education: string
  photo: string
  lastLogin: string
  createdAt: string
  updatedAt: string
}
