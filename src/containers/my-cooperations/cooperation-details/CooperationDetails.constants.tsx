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
  Faq,
  DataByRole
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

/*
    | 'subject'
    | 'title'
    | 'category'
    | 'price'
    | '_id'
    | 'chatId'
    | 'languages'
    | 'author'
    | 'proficiencyLevel'
    | 'description'
*/

export const defaultResponse: Cooperation = {
  offer: {
    description: '',
    chatId: '',
    price: 0,
    title: '',
    category: {
      _id: '',
      name: '',
      appearance: {
        icon: '',
        color: ''
      },
      totalOffers: {
        [UserRoleEnum.Student]: 0,
        [UserRoleEnum.Tutor]: 0
      },
      createdAt: '',
      updatedAt: ''
    },
    subject: {
      _id: '',
      name: ''
    },
    _id: '',
    languages: [], // Default to an empty array
    author: {
      _id: '',
      firstName: '',
      lastName: '',
      photo: null,
      FAQ: DataByRole<Faq[]>
    }
  },
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    role: UserRoleEnum.Tutor,
    photo: null
  },
  title: '',
  price: 0,
  proficiencyLevel: ProficiencyLevelEnum.Beginner,
  chatId: '',
  status: StatusEnum.Active,
  needAction: UserRoleEnum.Tutor,
  sections: [],
  createdAt: '',
  updatedAt: '',
  _id: '',
  initiator: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    nativeLanguage: null,
    address: {
      city: '',
      country: ''
    },
    notificationSettings: {
      email: true,
      push: true
    },
    bookmarkedOffers: [],
    lastLogin: '',
    createdAt: '',
    updatedAt: ''
  },
  initiatorRole: 'student',
  receiver: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    nativeLanguage: null,
    address: {
      city: '',
      country: '',
      street: '',
      postalCode: ''
    },
    notificationSettings: {
      email: true,
      push: true
    },
    bookmarkedOffers: [],
    lastLogin: '',
    createdAt: '',
    updatedAt: ''
  },
  receiverRole: 'tutor'
}
