import { ResourcesTypesEnum as ResourceType } from '~/types'

export const mockedEmptySectionsData = []

export const mockedNewEmptySectionsData = [
  {
    title: '',
    description: '',
    resources: []
  }
]

export const mockedCourseData = {
  title: 'Course title',
  description: 'Course description',
  sections: [
    {
      title: 'Course section1 title',
      description: 'Course section1 description',
      resources: [],
      id: '17121748017182'
    }
  ]
}

export const mockedSectionsData = [
  {
    title: 'Section1',
    description: 'Section1 description',
    resources: [
      {
        resource: {
          _id: '66183816fb40f35f91bb77ce',
          id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3b4c5d6e',
          title: 'Lesson 1',
          description: 'Lesson 1 description',
          content: 'Lesson 1 content'
        },
        resourceType: ResourceType.Lesson
      }
    ],
    id: '17121748017180'
  },
  {
    title: 'Section2 title',
    description: 'Section2 description',
    resources: [],
    id: '17121748017181'
  }
]
