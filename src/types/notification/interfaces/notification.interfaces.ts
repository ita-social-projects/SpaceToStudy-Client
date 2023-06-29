import { CommonEntityFields, NotificationTypeEnums } from '~/types'

export interface Notification extends CommonEntityFields {
  type: NotificationTypeEnums
  reference?: string
}
