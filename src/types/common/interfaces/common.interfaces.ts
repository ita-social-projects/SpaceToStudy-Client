import {
  Offer,
  UpdateFiltersInQuery,
  UserResponse,
  UserGeneralInfo,
  UserRoleEnum
} from '~/types'

export interface ItemsWithCount<T> {
  count: number
  items: T[]
}
export interface CommonEntityFields {
  _id: string
  createdAt: string
  updatedAt: string
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
  category: Pick<CategoryInterface, '_id' | 'appearance'>
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
  id?: string
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

export interface AddDocuments {
  maxFileSize: number
  maxAllFilesSize: number
  filesTypes: string[]
  fileSizeError: string
  allFilesSizeError: string
  typeError: string
  maxQuantityFiles: number
  quantityError: string
  maxFileNameLength: number
  maxFileNameError: string
}

declare global {
  export interface File {
    src?: string
  }
}

export interface StepData {
  generalInfo: {
    data: UserGeneralInfo
    errors: Record<string, string>
  }
  photo?: File[]
  subjects: Array<SubjectNameInterface & { category: CategoryNameInterface }>
  language: UserResponse['nativeLanguage']
}

export interface FiltersActions<T> {
  updateFiltersInQuery: UpdateFiltersInQuery<T>
  resetFilters: () => void
  updateQueryParams: () => void
}
