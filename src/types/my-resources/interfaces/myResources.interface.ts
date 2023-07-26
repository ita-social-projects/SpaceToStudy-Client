import { CommonEntityFields } from '~/types'

export interface Lesson extends CommonEntityFields {
  title: string
  attachments: string[]
}
