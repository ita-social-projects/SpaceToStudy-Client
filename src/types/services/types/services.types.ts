import { Sort } from '~/types/types/common.types'

export type Params = {
  name: string
  limit: number
  skip: number,
  sort: Sort
}
