import { ReactElement } from 'react'
import { ButtonProps } from '@mui/material/Button'
import TodayIcon from '@mui/icons-material/Today'

import Activities from '~/containers/my-cooperations/cooperation-activities/CooperationActivities'

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
