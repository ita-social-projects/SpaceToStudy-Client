import {
  Lesson,
  Quiz,
  Attachment,
  ResourceAvailabilityStatusEnum,
  Activities
} from '~/types'

export interface ResourceAvailability {
  status: ResourceAvailabilityStatusEnum
  date: Date | null
}

export type CourseResource = Lesson | Quiz | Attachment

export type SetResourseAvailability = (
  sectionId: string,
  availability: ResourceAvailability
) => void

export type CourseFieldValues = string &
  Lesson[] &
  Quiz[] &
  Attachment[] &
  string[] &
  Activities[]
