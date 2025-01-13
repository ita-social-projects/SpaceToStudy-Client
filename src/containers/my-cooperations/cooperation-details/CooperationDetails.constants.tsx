import { ReactElement } from 'react'
import { ButtonProps } from '@mui/material/Button'
import TodayIcon from '@mui/icons-material/Today'

import EmptyActivities from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities'
import MyCooperationsDetails from '../my-cooperations-details/MyCooperationsDetails'

import {
  Cooperation,
  CooperationTabsEnum,
  ProficiencyLevelEnum,
  StatusEnum,
  UserRoleEnum,
  LanguagesEnum,
  UserStatusEnum
} from '~/types'

export type MyCooperationsTabsData = {
  [key in CooperationTabsEnum]: {
    title?: string
    content?: ReactElement
    icon?: ReactElement
    tabProps?: Omit<ButtonProps, 'onClick'>
  }
}

export const tabsData: MyCooperationsTabsData = {
  [CooperationTabsEnum.Calendar]: {
    icon: <TodayIcon />
  },
  [CooperationTabsEnum.Activities]: {
    title: 'cooperationsPage.tabs.activities',
    content: <EmptyActivities />
  },
  [CooperationTabsEnum.Details]: {
    title: 'cooperationsPage.tabs.details',
    content: <MyCooperationsDetails />
  }
}

export const defaultResponse: Cooperation = {
  _id: 'default-id',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  offer: {
    subject: {
      _id: 'someId',
      name: 'Default Subject'
    },
    title: 'Default Offer Title',
    category: {
      _id: 'someId',
      name: 'Default Category',
      appearance: {
        icon: 'icon',
        color: 'red'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalOffers: {
        student: 1,
        tutor: 1
      }
    },
    price: 0,
    _id: 'default-offer-id',
    chatId: 'default-chat-id',
    languages: [LanguagesEnum.English],
    author: {
      _id: 'author-id',
      totalReviews: { student: 10, tutor: 5 },
      photo: 'https://example.com/photo.jpg',
      professionalSummary: 'An experienced tutor in math and science.',
      firstName: 'John',
      lastName: 'Doe',
      FAQ: { student: [], tutor: [] },
      averageRating: { student: 4.8, tutor: 4.9 }
    },
    proficiencyLevel: [ProficiencyLevelEnum.Beginner],
    description: 'Default offer description'
  },
  user: {
    firstName: 'Default',
    lastName: 'User',
    photo: null,
    _id: 'default-user-id',
    role: UserRoleEnum.Student
  },
  initiator: {
    _id: 'default-initiator-id',
    role: [],
    firstName: 'Default',
    lastName: 'Initiator',
    email: 'initiator@example.com',
    mainSubjects: { student: [], tutor: [] },
    totalReviews: { student: 0, tutor: 0 },
    averageRating: { student: 0, tutor: 0 },
    nativeLanguage: null,
    address: {
      city: 'Default City',
      country: 'Default Country'
    },
    professionalSummary: '',
    photo: null,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    FAQ: {
      student: [],
      tutor: []
    },
    videoLink: {
      student: '',
      tutor: ''
    },
    professionalBlock: undefined,
    aboutStudent: undefined,
    status: {
      student: UserStatusEnum.Active,
      tutor: UserStatusEnum.Active
    },
    notificationSettings: {
      isOfferStatusNotification: true,
      isChatNotification: false,
      isSimilarOffersNotification: false,
      isEmailNotification: false
    },
    bookmarkedOffers: [],
    lastSeen: null
  },
  initiatorRole: 'student',
  title: 'Default Cooperation Title',
  price: 0,
  proficiencyLevel: ProficiencyLevelEnum.Beginner,
  chatId: 'default-chat-id',
  status: StatusEnum.Pending,
  needAction: UserRoleEnum.Student,
  receiver: {
    _id: 'default-receiver-id',
    role: [],
    firstName: 'Default',
    lastName: 'Receiver',
    email: 'receiver@example.com',
    mainSubjects: { student: [], tutor: [] },
    totalReviews: { student: 0, tutor: 0 },
    averageRating: { student: 0, tutor: 0 },
    nativeLanguage: null,
    address: {
      city: 'Default City',
      country: 'Default Country'
    },
    professionalSummary: '',
    photo: null,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    FAQ: {
      student: [],
      tutor: []
    },
    videoLink: {
      student: '',
      tutor: ''
    },
    professionalBlock: undefined,
    aboutStudent: undefined,
    status: {
      student: UserStatusEnum.Active,
      tutor: UserStatusEnum.Active
    },
    notificationSettings: {
      isOfferStatusNotification: true,
      isChatNotification: false,
      isSimilarOffersNotification: false,
      isEmailNotification: false
    },
    bookmarkedOffers: [],
    lastSeen: null
  },
  receiverRole: 'tutor',
  sections: [
    {
      id: 'default-section-id',
      title: 'Default Section Title',
      description: 'Default Section Description',
      resources: []
    }
  ]
}
