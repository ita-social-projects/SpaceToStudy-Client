import { DateFilter, InitialSort } from '~/types/common/types/common.types'

type UserStatus = 'all' | 'active' | 'blocked' | 'invited'

export type UserInitialFilters = {
  name: string
  email: string
  status: UserStatus[]
  lastLogin: DateFilter
  createdAt: DateFilter
}

export type UserOptions = {
  page: number
  limit: number
} & UserInitialFilters & InitialSort

export type UserExternalFilter = {
  status: UserStatus
  role: string
}
