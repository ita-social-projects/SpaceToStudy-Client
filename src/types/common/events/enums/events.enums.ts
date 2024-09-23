export enum CourseResourceEventType {
  ResourceUpdated = 'resourceUpdated',
  ResourceRemoved = 'resourceRemoved',
  ResourcesOrderChange = 'resourcesOrderChange',
  AddSectionResources = 'addSectionResources',
  ResourceUpdateAvailability = 'resourceUpdateAvailability'
}

export enum CourseSectionEventType {
  SectionAdded = 'sectionAdded',
  SectionRemoved = 'sectionRemoved',
  SectionsOrderChange = 'sectionsOrderChange'
}
