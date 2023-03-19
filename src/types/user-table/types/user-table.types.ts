import { DateFilter } from '~/types/common/types/common.types'

type UserStatus = 'all' | 'active' | 'blocked' | 'invited'

export type UserInitialFilters = {
  name: string
  email: string
  role?: string
  status: UserStatus[]
  lastLogin: DateFilter
  createdAt: DateFilter
}
