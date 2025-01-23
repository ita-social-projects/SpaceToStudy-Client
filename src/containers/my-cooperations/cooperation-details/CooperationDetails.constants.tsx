import { ReactElement } from 'react'
import { ButtonProps } from '@mui/material/Button'
import TodayIcon from '@mui/icons-material/Today'

import EmptyActivities from '~/containers/my-cooperations/empty-cooperation-activities/EmptyCooperationActivities'
import MyCooperationsDetails from '../my-cooperations-details/MyCooperationsDetails'

import { CooperationTabsEnum } from '~/types'

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
