import { CommonEntityFields } from '~/types/common/common.index'

export interface Link extends CommonEntityFields {
  name: string
  url: string
}
