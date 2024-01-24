import { Lesson, Quiz, Attachment, ResourceAvailabilityStatus } from '~/types'

type Resources = Lesson | Quiz | Attachment

export type CourseResources = Resources & {
  resourceAvailability?: ResourceAvailabilityStatus
  openFromDate?: string | null
}
