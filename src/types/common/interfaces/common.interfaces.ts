import { Offer, UserResponse, UserRole, UserRoleEnum } from '~/types'

export interface ItemsWithCount<T> {
  count: number
  items: T[]
}
export interface CommonEntityFields {
  _id: string
  createdAt: string
  updatedAt: string
}
export interface UserInterface {
  _id: string
  firstName: string
  lastName: string
  photo?: string
  averageRating: number
  totalReviews: number
}

export interface MessageInterface {
  _id: string
  author: UserInterface
  authorRole: UserRole
  messageContent: string
  timestamp: Date | string
}

export interface CategoryAppearance {
  icon: string
  color: string
}

export interface DataByRole<T> {
  [UserRoleEnum.Student]: T
  [UserRoleEnum.Tutor]: T
}

export interface CategoryInterface {
  _id: string
  name: string
  appearance: CategoryAppearance
  totalOffers: DataByRole<number>
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
  totalOffers: DataByRole<number>
  createdAt: string
  updatedAt: string
}

export interface SubjectNameInterface {
  _id: string
  name: string
}

export interface ReviewInterface {
  offer: Offer
  author: UserResponse
  comment: string
  rating: number
  createdAt: string
}

export interface Faq {
  question: string
  answer: string
}
export interface OutletContext {
  pageRef: React.RefObject<HTMLDivElement> | null
}

export interface Breakpoints {
  isDesktop: boolean
  isLaptopAndAbove: boolean
  isLaptop: boolean
  isTablet: boolean
  isMobile: boolean
}
export interface RouteItem {
  route: string
  path: string
}
