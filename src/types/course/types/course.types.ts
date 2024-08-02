import {
  Lesson,
  Quiz,
  Attachment,
  ResourceAvailabilityStatusEnum,
  Resource
} from '~/types'

export interface ResourceAvailability {
  status: ResourceAvailabilityStatusEnum
  date: Date | null
}

export type CourseResource = Lesson | Quiz | Attachment

export type SetResourceAvailability = (
  sectionId: string,
  availability: ResourceAvailability
) => void

export type CourseFieldValues = string & string[] & Resource[]
