import i18n from 'i18next'
import {
  ResourceAvailabilityStatusEnum,
  ResourcesTypesEnum as ResourceType
} from '~/types'
import { resourcesData } from '~/containers/course-section/CourseSectionContainer.constants'

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { SvgIconComponent } from '@mui/icons-material'

export const selectionFields = [
  {
    value: ResourceAvailabilityStatusEnum.Open,
    title: i18n.t('cooperationDetailsPage.resourceSelection.open')
  },
  {
    value: ResourceAvailabilityStatusEnum.OpenFrom,
    title: i18n.t('cooperationDetailsPage.resourceSelection.openFrom')
  },
  {
    value: ResourceAvailabilityStatusEnum.Closed,
    title: i18n.t('cooperationDetailsPage.resourceSelection.closed')
  }
]

export const availabilityIcons: Record<
  ResourceAvailabilityStatusEnum,
  SvgIconComponent
> = {
  [ResourceAvailabilityStatusEnum.Open]: CheckCircleOutlineOutlinedIcon,
  [ResourceAvailabilityStatusEnum.OpenFrom]: LockOutlinedIcon,
  [ResourceAvailabilityStatusEnum.Closed]: LockOutlinedIcon
}

export const resourceIcons: Partial<Record<ResourceType, JSX.Element | null>> =
  {
    [ResourceType.Lesson]: resourcesData.lessons.icon,
    [ResourceType.Quiz]: resourcesData.quizzes.icon,
    [ResourceType.Attachment]: resourcesData.attachments.icon
  }
