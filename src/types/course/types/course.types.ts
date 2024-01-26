import {
  Lesson,
  Quiz,
  Attachment,
  ResourceAvailabilityStatusEnum
} from '~/types'

type Resources = Lesson | Quiz | Attachment

export type CourseResources = Resources & {
  resourceAvailability?: ResourceAvailabilityStatusEnum
  openFromDate?: string | null
}
