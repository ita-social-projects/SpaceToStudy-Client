import { SortEnum } from '../common.index'

export type Category = {
  _id: string
  name: string
}

export type CreatedAt = {
  from: string
  to: string
}

export type LastLogin = {
  from: string
  to: string
}

export type Sort = {
  order: SortEnum
  orderBy: string
}

export type DateFilter = {
  from: string
  to: string
}

export type Address = {
  country: string
  city: string
}
