import { CommonEntityFields } from '~/types/common/common.index'

export interface Media extends CommonEntityFields {
  _id: string
  path: string
  name: string
}
