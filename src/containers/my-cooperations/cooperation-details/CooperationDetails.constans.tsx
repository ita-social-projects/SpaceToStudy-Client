import { ReactElement } from 'react'
import { ButtonProps } from '@mui/material/Button'
import TodayIcon from '@mui/icons-material/Today'

import Activities from '~/containers/my-cooperations/cooperation-activities/CooperationActivities'
import {
  Cooperation,
  ProficiencyLevelEnum,
  StatusEnum,
  UserRoleEnum
} from '~/types'

export interface MyCooperationsTabsData {
  [key: string]: {
    title?: string
    content?: ReactElement
    icon?: ReactElement
    tabProps?: Omit<ButtonProps, 'onClick'>
  }
}

export const tabsData: MyCooperationsTabsData = {
  calendar: {
    icon: <TodayIcon />
  },
  activities: {
    title: 'cooperationsPage.tabs.activities',
    content: <Activities />
  },
  details: {
    title: 'cooperationsPage.tabs.details'
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
  createdAt: '',
  updatedAt: '',
  _id: ''
}
