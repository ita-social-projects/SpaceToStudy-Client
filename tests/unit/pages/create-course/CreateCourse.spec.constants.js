import { ResourcesTypesEnum as ResourceType } from '~/types'

export const mockCategoriesNames = [
  { _id: '64884f33fdc2d1a130c24ac2', name: 'Mathematic' },
  { _id: '660c27618a9fbf234b8bb4cd', name: 'Music' }
]

export const mockSubjectsNames = [
  { _id: '6566133a2bccdd3e18dbe943', name: 'Algebra' },
  { _id: '010c23518a9fbf934b8bf4cd', name: 'Geometry' }
]

export const mockNewSectionResource = {
  _id: '66b67d84b58ba31be667ee9d',
  id: 'e7f8a9b0-c1d2-3e4f-5a6b-7c8d9e0f1a2b',
  author: '6658f73f93885febb491e08b',
  title: 'New Lesson',
  description: 'New lesson description',
  content: '<h4>Lesson New Plan:</h4>',
  attachments: [],
  category: '64884f33fdc2d1a130c24ac2',
  resourceType: ResourceType.Lesson
}

export const mockUpdatedSectionResource = {
  _id: '66b67d84b58ba31be667ee2d',
  author: '6658f73f93885febb491e08b',
  title: 'Updated Lesson',
  description: 'Updated lesson description',
  content: '<h4>Lesson Updated Plan:</h4>',
  attachments: [],
  category: '64884f33fdc2d1a130c24ac2',
  resourceType: ResourceType.Lesson
}

export const mockCourseResponseData = {
  _id: '66b6862cb58ba31be667f1a6',
  title: 'Mastering Systems of Linear Equations',
  description:
    'This course is designed for 10th-grade students to explore and master the concepts and techniques involved in solving systems of linear equations.',
  author: '6658f73f93885febb491e08b',
  category: '64884f33fdc2d1a130c24ac2',
  subject: '6566133a2bccdd3e18dbe943',
  proficiencyLevel: ['Beginner', 'Intermediate'],
  sections: [
    {
      title: 'Introduction to Systems of Linear Equations',
      description:
        'Understand what a system of linear equations is and the possible outcomes when solving them (one solution, no solution, or infinitely many solutions).',
      resources: [
        {
          resource: {
            _id: '66b67d84b58ba31be667ee2d',
            author: '6658f73f93885febb491e08b',
            title: 'Exploring Systems of Linear Equations',
            description:
              'Students will learn to solve systems of linear equations using different methods, including graphing, substitution, and elimination. ',
            content: '<h4>Lesson Plan:</h4>',
            attachments: [],
            category: '6684175179e5232bce4579ed',
            resourceType: ResourceType.Lesson,
            availability: {
              status: 'open',
              date: null
            }
          },
          resourceType: ResourceType.Lesson
        },
        {
          resource: {
            _id: '66b67e2ab58ba31be667ee4c',
            title: 'Quiz: Exploring Systems of Linear Equations',
            description:
              'Introduce the substitution method, where one equation is solved for one variable, and that expression is substituted into the other equation.',
            items: ['66b67e02b58ba31be667ee43'],
            author: '6658f73f93885febb491e08b',
            category: '6684175179e5232bce4579ed',
            resourceType: ResourceType.Quiz,
            availability: {
              status: 'open',
              date: null
            },
            settings: {
              view: 'Scroll',
              shuffle: false,
              pointValues: false,
              scoredResponses: false,
              correctAnswers: false
            }
          },
          resourceType: ResourceType.Quiz
        },
        {
          resource: {
            _id: '66b67eafb58ba31be667ee83',
            author: '6658f73f93885febb491e08b',
            fileName: 'Exploring Systems of Linear Equations.png',
            link: '1723236050559-Exploring Systems of Linear Equations.png',
            size: 39340,
            category: '6684175179e5232bce4579ed',
            resourceType: ResourceType.Attachment,
            availability: {
              status: 'open',
              date: null
            }
          },
          resourceType: ResourceType.Attachment
        }
      ],
      _id: '66b6862cb58ba31be667f1a7',
      id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3b4c5d6e'
    }
  ]
}

export const mockNewCourseData = {
  _id: '66b6862cb58ba31be667f1a6',
  title: 'Learning Multiplication Tables',
  description:
    'This course is designed for elementary school students to learn and master the multiplication tables from 1 to 12.',
  author: '6658f73f93885febb491e08b',
  category: '64884f33fdc2d1a130c24ac2',
  subject: '6566133a2bccdd3e18dbe943',
  proficiencyLevel: ['Beginner'],
  sections: [
    {
      title: 'Introduction to Multiplication Tables',
      description:
        'Understand the basics of multiplication and the importance of learning multiplication tables.',
      resources: [
        {
          resource: {
            _id: '66b67d84b58ba31be667ee2d',
            author: '6658f73f93885febb491e08b',
            title: 'Basics of Multiplication',
            description:
              'Students will learn the concept of multiplication and how it relates to addition.',
            content: '<h4>Lesson Plan:</h4>',
            attachments: [],
            category: '6684175179e5232bce4579ed',
            resourceType: ResourceType.Lesson,
            availability: {
              status: 'open',
              date: null
            }
          },
          resourceType: ResourceType.Lesson
        },
        {
          resource: {
            _id: '66b67e2ab58ba31be667ee4c',
            title: 'Quiz: Basics of Multiplication',
            description:
              'A quiz to test the understanding of basic multiplication concepts.',
            items: ['66b67e02b58ba31be667ee43'],
            author: '6658f73f93885febb491e08b',
            category: '6684175179e5232bce4579ed',
            resourceType: ResourceType.Quiz,
            availability: {
              status: 'open',
              date: null
            },
            settings: {
              view: 'Scroll',
              shuffle: false,
              pointValues: false,
              scoredResponses: false,
              correctAnswers: false
            }
          },
          resourceType: ResourceType.Quiz
        },
        {
          resource: {
            _id: '66b67eafb58ba31be667ee83',
            author: '6658f73f93885febb491e08b',
            fileName: 'Multiplication Tables Chart.png',
            link: '1723236050559-Multiplication Tables Chart.png',
            size: 39340,
            category: '6684175179e5232bce4579ed',
            resourceType: ResourceType.Attachment,
            availability: {
              status: 'open',
              date: null
            }
          },
          resourceType: ResourceType.Attachment
        }
      ],
      _id: '66b6862cb58ba31be667f1a7',
      id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3b4c5d6e'
    }
  ]
}

export const mockUpdatedCourseData = {
  _id: '66b6862cb58ba31be667f1a6',
  title: 'Mastering Systems of Linear Equations 2',
  description:
    'This course is designed for 11th-grade students to explore and master the concepts and techniques involved in solving systems of linear equations.',
  author: '6658f73f93885febb491e08b',
  category: '64884f33fdc2d1a130c24ac2',
  subject: '6566133a2bccdd3e18dbe943',
  proficiencyLevel: ['Intermediate', 'Advanced'],
  sections: [
    {
      title: 'Introduction to Systems of Linear Equations',
      description:
        'Understand what a system of linear equations is and the possible outcomes when solving them (one solution, no solution, or infinitely many solutions).',
      resources: []
    }
  ]
}
