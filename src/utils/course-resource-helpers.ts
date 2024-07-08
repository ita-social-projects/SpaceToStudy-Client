import {
  Attachment,
  CooperationResourceField,
  CourseResource,
  CourseSection,
  Lesson,
  Quiz,
  ResourceAvailabilityStatusEnum
} from '~/types'
import { COOPERATION_RESOURCE_TYPES } from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList.constants'

export function getSectionResourceField(
  resourceType: CourseResource['resourceType']
): CooperationResourceField | null {
  if (COOPERATION_RESOURCE_TYPES.includes(resourceType)) {
    return resourceType as CooperationResourceField
  }

  return null
}

export function recalculateResourceOrder(
  currentOrder: string[],
  section: CourseSection
): string[] {
  let order = currentOrder ?? []

  const allResources = [
    ...section.lessons,
    ...section.quizzes,
    ...section.attachments
  ]

  const allResourcesMap = new Map(
    allResources.map((resource) => [resource._id, resource])
  )

  order = order.filter((id) => allResourcesMap.has(id))

  const newResources = allResources.filter(
    (resource) => !order.includes(resource._id)
  )

  return [...order, ...newResources.map((resource) => resource._id)]
}

export function updateAvailabilityStatus(
  items: Lesson[] | Quiz[] | Attachment[],
  status: ResourceAvailabilityStatusEnum
): void {
  for (const item of items ?? []) {
    item.availability = {
      status,
      date: null
    }
  }
}
