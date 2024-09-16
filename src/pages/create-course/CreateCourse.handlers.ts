import { v4 as uuidv4 } from 'uuid'

import { sectionInitialData } from '~/pages/create-course/CreateCourse.constants'
import {
  CreateCourseContext,
  CourseSection,
  CourseSectionEventType,
  CourseResource,
  CourseResourceEventType,
  SectionRemovedEvent,
  SectionsOrderChangeEvent,
  AddSectionResourcesEvent,
  ResourceUpdatedEvent,
  ResourceRemovedEvent,
  ResourcesOrderChangeEvent
} from '~/types'

const getSectionById = (
  sections: CourseSection[],
  sectionId: string
): CourseSection | undefined => {
  const section = sections.find((section) => section.id === sectionId)
  return section || undefined
}

export const sectionHandlers = {
  [CourseSectionEventType.SectionAdded]: (ctx: CreateCourseContext) =>
    addNewSection(ctx),
  [CourseSectionEventType.SectionRemoved]: (
    ctx: CreateCourseContext,
    event: SectionRemovedEvent
  ) => deleteSection(ctx, event.sectionId),
  [CourseSectionEventType.SectionsOrderChange]: (
    ctx: CreateCourseContext,
    event: SectionsOrderChangeEvent
  ) => updateSectionsOrder(ctx, event.sections)
}

export const addNewSection = ({
  sections,
  setSectionsData
}: CreateCourseContext): void => {
  const newSectionData = { ...sectionInitialData, id: uuidv4() }
  const updatedSections = [...sections, newSectionData]

  setSectionsData(updatedSections)
}

export const deleteSection = (
  { sections, setSectionsData }: CreateCourseContext,
  sectionId: string
): void => {
  const updatedSections = sections.filter((section) => section.id !== sectionId)

  setSectionsData(updatedSections)
}

export const updateSectionsOrder = (
  { setSectionsData }: CreateCourseContext,
  sections: CourseSection[]
): void => {
  setSectionsData(sections)
}

export const resourceHandlers = {
  [CourseResourceEventType.AddSectionResources]: (
    ctx: CreateCourseContext,
    event: AddSectionResourcesEvent
  ) =>
    addSectionResources(
      ctx,
      event.sectionId,
      event.resources,
      event.isDuplicate
    ),
  [CourseResourceEventType.ResourceUpdated]: (
    ctx: CreateCourseContext,
    event: ResourceUpdatedEvent
  ) => updateResource(ctx, event.sectionId, event.resourceId, event.resource),
  [CourseResourceEventType.ResourceRemoved]: (
    ctx: CreateCourseContext,
    event: ResourceRemovedEvent
  ) => deleteResource(ctx, event.sectionId, event.resourceId),
  [CourseResourceEventType.ResourcesOrderChange]: (
    ctx: CreateCourseContext,
    event: ResourcesOrderChangeEvent
  ) => updateResourcesOrder(ctx, event.sectionId, event.resources)
}

export const addSectionResources = (
  { sections, handleSectionChange }: CreateCourseContext,
  sectionId: CourseSection['id'],
  resources: CourseResource[],
  isDuplicate?: boolean
): void => {
  const section = getSectionById(sections, sectionId)
  if (!section) return

  const newResources = resources
    .filter((resource) => {
      return !section.resources.some(
        (item) => item.resource.id === resource.id && !isDuplicate
      )
    })
    .map((resource) => {
      const { _id, ...newDuplicateResource } = resource
      return {
        resource: {
          ...newDuplicateResource,
          id: uuidv4(),
          ...(isDuplicate ? { _id: '', isDuplicate: true } : { _id })
        },
        resourceType: resource.resourceType
      }
    })

  const newSectionResources = [...section.resources, ...newResources]
  handleSectionChange(sectionId, 'resources', newSectionResources)
}

export const updateResource = (
  { sections, handleSectionChange }: CreateCourseContext,
  sectionId: CourseSection['id'],
  resourceId: CourseResource['id'],
  resource: Partial<CourseResource>
): void => {
  const section = getSectionById(sections, sectionId)
  if (!section) return

  const currentResource = section.resources.find(
    (item) => item.resource.id === resourceId
  )
  if (!currentResource) return

  const newSectionResources = section.resources.map((item) =>
    item.resource.id === resourceId ? { ...currentResource, ...resource } : item
  )

  handleSectionChange(sectionId, 'resources', newSectionResources)
}

export const deleteResource = (
  { sections, handleSectionChange }: CreateCourseContext,
  sectionId: CourseSection['id'],
  resourceId: CourseResource['id']
): void => {
  const section = getSectionById(sections, sectionId)
  if (!section) return

  const newSectionResources = section.resources.filter(
    (resource) => resource.resource.id !== resourceId
  )
  handleSectionChange(sectionId, 'resources', newSectionResources)
}

export const updateResourcesOrder = (
  { sections, handleSectionChange }: CreateCourseContext,
  sectionId: CourseSection['id'],
  resources: CourseResource[]
): void => {
  const section = getSectionById(sections, sectionId)
  if (!section) return

  const newSectionResources = resources.map((resource) => ({
    resource,
    resourceType: resource.resourceType
  }))
  handleSectionChange(sectionId, 'resources', newSectionResources)
}
