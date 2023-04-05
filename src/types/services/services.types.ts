import { CreatedAt, LastLogin, Sort } from '~/types/types/common.types'

export interface getUsersParams {
  createdAt: CreatedAt
  email: string
  lastLogin: LastLogin
  limit: number
  name: string
  role: string
  skip: number
  sort: Sort
  status: string[]
}
