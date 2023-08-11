import { CommonEntityFields } from '~/types/common/common.index'

export interface Link extends CommonEntityFields {
  _id: string
  name: string
  url: string
}
