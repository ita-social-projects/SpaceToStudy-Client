import {
  CommonEntityFields,
  UserResponse,
  Category,
  Question,
  ResourcesTabsEnum as ResourcesTypes
} from '~/types'

export interface Quiz extends CommonEntityFields {
  title: string
  description: string
  items: Question[]
  author: Pick<UserResponse, '_id'>
  category: Category | null
  resourceType?: ResourcesTypes
}

export type CreateQuizParams = Omit<
  Quiz,
  'author' | '_id' | 'createdAt' | 'updatedAt'
>

export interface UpdateQuizParams
  extends Omit<Quiz, 'author' | '_id' | 'createdAt' | 'updatedAt'> {
  id: string
}
