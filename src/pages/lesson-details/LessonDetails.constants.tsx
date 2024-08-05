import {
  Lesson,
  ResourceAvailabilityStatusEnum,
  ResourcesTypesEnum as ResourceType
} from '~/types'

export const defaultResponse: Lesson = {
  attachments: [],
  category: null,
  author: '',
  createdAt: '',
  description: '',
  content: '',
  title: '',
  updatedAt: '',
  _id: '',
  availability: {
    status: ResourceAvailabilityStatusEnum.Open,
    date: null
  },
  resourceType: ResourceType.Lesson
}
