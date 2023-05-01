import { Address, Offer } from '~/types'

export interface CommonEntityFields {
  _id: string
  createdAt: string
  updatedAt: string
}
export interface UserInterface extends CommonEntityFields {
  role: string[]
  firstName: string
  lastName: string
  email: string
  address?: Address
  photo?: string
  categories?: string[]
  education?: string
  nativeLanguage?: string
  isEmailConfirmed?: boolean
  isFirstLogin?: boolean
  lastLogin: string
  appLanguage?: string
  status: string
  lastLoginAs?: string
  bookmarkedOffers?: string[]
}

export interface CategoryInterface {
  _id: string
  name: string
  categoryIcon: string
  totalOffers: number
  createdAt: string
  updatedAt: string
}

export interface CategoryNameInterface {
  _id: string
  name: string
}

export interface SubjectInterface {
  _id: string
  name: string
  category: string
  totalOffers: number
  createdAt: string
  updatedAt: string
}

export interface SubjectNameInterface {
  _id: string
  name: string
}

export interface ReviewInterface {
  offer: Offer
  author: Pick<UserInterface, 'firstName' | 'lastName' | 'photo'>
  comment: string
  rating: number
  createdAt: string
}
