import {
  Lesson,
  Quiz,
  Attachment,
  ResourceAvailabilityStatusEnum
} from '~/types'

type Resources = Lesson | Quiz | Attachment

export type CourseResources = Resources & {
  availability?: ResourceAvailabilityStatusEnum
  openFromDate?: string | null
}
