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
  UserRoleEnum
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
  offer: {
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
    price: 0,
    _id: ''
  },
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    role: UserRoleEnum.Tutor
  },
  title: '',
  price: 0,
  proficiencyLevel: ProficiencyLevelEnum.Beginner,
  status: StatusEnum.Active,
  needAction: UserRoleEnum.Tutor,
  sections: [],
  createdAt: '',
  updatedAt: '',
  _id: ''
}
