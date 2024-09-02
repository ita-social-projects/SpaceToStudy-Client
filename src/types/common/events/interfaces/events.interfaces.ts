import {
  CourseResourceEventType,
  CourseSectionEventType,
  ResourceEvent,
  SectionEvent,
  CourseResource,
  CourseSection,
  FormInputValueChange
} from '~/types'

export interface ResourceUpdatedEvent {
  type: CourseResourceEventType.ResourceUpdated
  sectionId: string
  resourceId: string
  resource: Partial<CourseResource>
}

export interface ResourceRemovedEvent {
  type: CourseResourceEventType.ResourceRemoved
  sectionId: string
  resourceId: string
}

export interface ResourcesOrderChangeEvent {
  type: CourseResourceEventType.ResourcesOrderChange
  sectionId: string
  resources: CourseResource[]
}

export interface AddSectionResourcesEvent {
  type: CourseResourceEventType.AddSectionResources
  sectionId: string
  resources: CourseResource[]
  isDuplicate?: boolean
}

export interface SectionAddedEvent {
  type: CourseSectionEventType.SectionAdded
  index?: number
}

export interface SectionRemovedEvent {
  type: CourseSectionEventType.SectionRemoved
  sectionId: string
}

export interface SectionsOrderChangeEvent {
  type: CourseSectionEventType.SectionsOrderChange
  sections: CourseSection[]
}

export interface CourseSectionHandlers {
  handleSectionInputChange: FormInputValueChange<string, CourseSection>
  resourceEventHandler?: (event: ResourceEvent) => void
  sectionEventHandler?: (event: SectionEvent) => void
  titleText?: string
}
