import { ResourcesTypesEnum as ResourceType } from '~/types'

export const mockedSectionData = {
  id: 1,
  title: 'Title',
  description: 'Description',
  resources: [
    {
      resource: {
        availability: {
          status: 'open',
          date: null
        },
        _id: '64cd12f1fad091e0sfe12134',
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
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
      resource: {
        availability: {
          status: 'open',
          date: null
        },
        _id: '64fb2c33eba89699411d22bb',
        id: '9b2e3d7e-1c4b-4f3b-8f8e-2d3b2c3d4e5f',
        title: 'Quiz',
        description: '',
        items: [],
        author: '648afee884936e09a37deaaa',
        category: { id: '64fb2c33eba89699411d22bb', name: 'Music' },
        createdAt: '2023-09-08T14:14:11.373Z',
        updatedAt: '2023-09-08T14:14:11.373Z',
        resourceType: ResourceType.Quiz
      },
      resourceType: ResourceType.Quiz
    },
    {
      resource: {
        availability: {
          status: 'open',
          date: null
        },
        _id: '64cd12f1fad091e0ee719830',
        id: 'd2c3b4e5-6f7a-8b9c-0d1e-2f3b4c5d6e7f',
        author: '6494128829631adbaf5cf615',
        fileName: 'spanish.pdf',
        link: 'link',
        category: { id: '64fb2c33eba89699411d22bb', name: 'History' },
        description: 'Mock description for attachments',
        size: 100,
        createdAt: '2023-07-25T13:12:12.998Z',
        updatedAt: '2023-07-25T13:12:12.998Z',
        resourceType: ResourceType.Attachment
      },
      resourceType: ResourceType.Attachment
    }
  ]
}

export const mockedUpdatedResources = [
  { _id: 'resource1', resourceType: ResourceType.Lesson },
  { _id: 'resource2', resourceType: ResourceType.Quiz }
]
