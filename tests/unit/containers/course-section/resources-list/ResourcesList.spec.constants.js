import { ResourcesTypesEnum as ResourceType } from '~/types'

export const mokedCooperationData = [
  {
    availability: { status: 'closed', date: null },
    resource: {
      id: '1',
      title: 'Lesson1',
      author: 'some author',
      content: 'Content',
      description: 'Description',
      attachments: [],
      category: null,
      resourceType: ResourceType.Lesson
    },
    resourceType: ResourceType.Lesson
  },
  {
    availability: { status: 'closed', date: null },
    resource: {
      id: '2',
      title: 'Lesson2',
      author: 'new author',
      content: 'Content',
      description: 'Description',
      attachments: [],
      category: null,
      resourceType: ResourceType.Lesson
    },
    resourceType: ResourceType.Lesson
  }
]

export const mockedLessonData = [
  {
    id: '1',
    title: 'Lesson1',
    author: 'some author',
    content: 'Content',
    description: 'Description',
    attachments: [],
    category: null,
    resourceType: ResourceType.Lesson
  },
  {
    id: '2',
    title: 'Lesson2',
    author: 'new author',
    content: 'Content',
    description: 'Description',
    attachments: [],
    category: null,
    resourceType: ResourceType.Lesson
  }
]
