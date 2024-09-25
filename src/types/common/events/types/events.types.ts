import {
  ResourceUpdatedEvent,
  ResourceRemovedEvent,
  ResourcesOrderChangeEvent,
  ResourceUpdateAvailabilityEvent,
  AddSectionResourcesEvent,
  SectionAddedEvent,
  SectionRemovedEvent,
  SectionsOrderChangeEvent,
  CreateCourseContext
} from '~/types'

export type ResourceEvent =
  | ResourceUpdatedEvent
  | ResourceRemovedEvent
  | ResourcesOrderChangeEvent
  | AddSectionResourcesEvent
  | ResourceUpdateAvailabilityEvent

export type SectionEvent =
  | SectionAddedEvent
  | SectionRemovedEvent
  | SectionsOrderChangeEvent

export type ResourceEventHandler = (
  ctx: CreateCourseContext,
  event: ResourceEvent
) => void

export type SectionEventHandler = (
  ctx: CreateCourseContext,
  event: SectionEvent
) => void
