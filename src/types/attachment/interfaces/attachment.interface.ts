import { CommonEntityFields } from '~/types'

export interface Attachment extends CommonEntityFields {
  author: string
  fileName: string
  link: string
  description: string
  size: number
}
