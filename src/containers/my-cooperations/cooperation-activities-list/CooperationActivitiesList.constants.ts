import { CourseSection, ResourcesTabsEnum } from '~/types'

export const initialCooperationSectionData: CourseSection = {
  id: '',
  title: '',
  description: '',
  lessons: [],
  quizzes: [],
  attachments: [],
  order: []
}

export const COOPERATION_RESOURCE_TYPES = [
  ResourcesTabsEnum.Lessons,
  ResourcesTabsEnum.Quizzes,
  ResourcesTabsEnum.Attachments
]
