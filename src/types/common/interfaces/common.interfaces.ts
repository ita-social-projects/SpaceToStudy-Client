import { Address, CreateOfferResponse } from '~/types'

export interface CommonEntityFields {
  _id: string
  createdAt: string
  updatedAt: string
}
export interface UserInterface {
  _id: string
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
  createdAt: string
  updatedAt: string
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
  offer: CreateOfferResponse
  author: UserInterface
  comment: string
  rating: number
  createdAt: string
}
