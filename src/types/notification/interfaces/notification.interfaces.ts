import { CommonEntityFields } from '~/types'

export interface Notification extends CommonEntityFields {
  type: string
  reference?: string
}
